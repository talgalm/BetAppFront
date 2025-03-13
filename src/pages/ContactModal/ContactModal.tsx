import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import {
  AvatarsDiv,
  ItemsBodyContent,
  ItemsContant,
  ItemsHeaderContent,
  ItemsNameImageCircleContent,
  ItemsNameImageContent,
  PopUpDiv,
  PopUpHeader,
  PopUpNotInContact,
  PopUpOverlay,
  PopUpScroll,
} from './ContactModal.styles';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { ReactComponent as AddContactIcon } from '../../Theme/Icons/ContactAdd.svg';

import { useTranslation } from 'react-i18next';
import StyledInput from '../../components/Inputs/StylesInput/StyledInput';
import { Control, FieldValues } from 'react-hook-form';
import { ReactComponent as Search } from '../../Theme/Icons/Search.svg';
import Circle from '../../components/Circle/CircleComponent';
import { Group, User } from '../../api/interfaces';
import { useGetContacts, useGetMostActives } from '../../Hooks/useGetUsers';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';

interface ContactModalProps<T extends FieldValues> {
  open: boolean;
  handlePopUpClose: () => void;
  control: Control<T>;
  inputName: string;
  groups: Group[];
  selectedUsers?: User[];
  handleSelectUser: (user: User) => void;
  limit?: number;
}

const ContactModal = <T extends FieldValues>({
  open,
  handlePopUpClose,
  control,
  inputName,
  groups,
  selectedUsers,
  handleSelectUser,
  limit,
}: ContactModalProps<T>) => {
  const { t } = useTranslation();
  const { contacts = [] } = useGetContacts(1);
  const [user, setUser] = useAtom(userAtom);
  const { mostActives = [] } = useGetMostActives(user?.id);

  const willExceedLimit = (newUsers: User[]) => {
    return (selectedUsers?.length || 0) + newUsers.length > (limit || Infinity);
  };

  const handleSelectSingleUser = (user: User) => {
    if (isSelected(user)) {
      handleSelectUser(user);
    } else {
      if (willExceedLimit([user])) {
        alert(t('ContactModal.limitExceeded', { limit }));
        return;
      }
      handleSelectUser(user);
    }
  };

  const handleSelectItems = (items: User[]) => {
    if (willExceedLimit(items)) {
      alert(t('ContactModal.limitExceeded', { limit }));
      return;
    }

    const allSelected = items.every((item) => isSelected(item));
    if (allSelected) {
      items.forEach((item) => handleSelectUser(item));
    } else {
      items.forEach((item) => handleSelectUser(item));
    }
  };

  const isSelected = (item: User) =>
    selectedUsers?.some((selectedItem) => selectedItem.id === item.id);

  const isGroupSelected = (items: User[]) => items.every((item) => isSelected(item));

  return (
    <PopUpOverlay isOpen={open} onClick={handlePopUpClose}>
      <PopUpDiv isOpen={open} onClick={(e) => e.stopPropagation()} padding>
        <PopUpHeader>
          <CloseIcon
            onClick={handlePopUpClose}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              left: '20px',
              top: '20px',
              color: 'white',
            }}
          />
          <Typography
            value={t('ContactModal.chooseContact')}
            variant={TypographyTypes.H6}
            styleProps={{ color: '#EDEDF5', textAlign: 'center', width: '100%' }}
          />
          <div style={{ width: '100%' }}>
            <StyledInput
              control={control}
              inputName={inputName}
              placeholder={t('ContactModal.placeholder')}
              icon={Search}
            />
          </div>
        </PopUpHeader>
        <PopUpScroll>
          <PopUpNotInContact>
            <AddContactIcon />
            <Typography value={t('ContactModal.notInContact')} variant={TypographyTypes.H4} />
          </PopUpNotInContact>
          <ItemsContant>
            <ItemsHeaderContent>
              <Typography value={t('ContactModal.groups')} variant={TypographyTypes.H6} />
            </ItemsHeaderContent>
            {groups.map((item, index) => (
              <ItemsBodyContent
                key={index}
                onClick={() => handleSelectItems(item.users)}
                selected={isGroupSelected(item.users)}
              >
                <ItemsNameImageContent>
                  <AvatarsDiv>{}</AvatarsDiv>
                  {item.name}
                </ItemsNameImageContent>
                <Typography
                  value={`${item.users.length} ${t('ContactModal.users')} `}
                  variant={TypographyTypes.H6}
                />
              </ItemsBodyContent>
            ))}
          </ItemsContant>
          {mostActives.length > 0 && (
            <ItemsContant>
              <ItemsHeaderContent>
                <Typography value={t('ContactModal.mostActives')} variant={TypographyTypes.H6} />
              </ItemsHeaderContent>
              {mostActives.map((item, index) => (
                <ItemsBodyContent
                  key={index}
                  onClick={() => handleSelectSingleUser(item)}
                  selected={isSelected(item)}
                >
                  <ItemsNameImageCircleContent>
                    <Circle
                      index={index}
                      participantsNumber={1}
                      styleProps={{ height: 24, width: 24 }}
                    />
                    {item.fullName}
                  </ItemsNameImageCircleContent>
                  <Typography value={item.phoneNumber || ''} variant={TypographyTypes.H6} />
                </ItemsBodyContent>
              ))}
            </ItemsContant>
          )}
          <ItemsContant>
            <ItemsHeaderContent>
              <Typography value={t('ContactModal.contacts')} variant={TypographyTypes.H6} />
            </ItemsHeaderContent>
            {contacts
              .filter((item) => item.id !== user?.id)
              .map((item, index) => (
                <ItemsBodyContent
                  key={index}
                  onClick={() => handleSelectSingleUser(item)}
                  selected={isSelected(item)}
                >
                  <ItemsNameImageCircleContent>
                    <Circle
                      index={index}
                      participantsNumber={1}
                      styleProps={{ height: 24, width: 24 }}
                    />
                    {item.fullName}
                  </ItemsNameImageCircleContent>
                  <Typography value={item.phoneNumber || ''} variant={TypographyTypes.H6} />
                </ItemsBodyContent>
              ))}
          </ItemsContant>
        </PopUpScroll>
      </PopUpDiv>
    </PopUpOverlay>
  );
};

export default ContactModal;
