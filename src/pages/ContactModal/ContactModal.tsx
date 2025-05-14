import { Typography } from '../../components/Topography/topography';
import {
  ItemsBodyContent,
  ItemsContant,
  ItemsHeaderContent,
  ItemsNameImageCircleContent,
  PopUpDiv,
  PopUpHeader,
  PopUpHeader2,
  PopUpNotInContact,
  PopUpOverlay,
  PopUpScroll,
  SmallAvatar,
} from './ContactModal.styles';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { ReactComponent as ReturnIcon } from '../../Theme/Icons/LayoutIcons/ReturnArrow.svg';
import { ReactComponent as AddContactIcon } from '../../Theme/Icons/ContactAdd.svg';
import { ReactComponent as Logo } from '../../Theme/Icons/Logo.svg';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, Path, useController, useForm } from 'react-hook-form';
import { ReactComponent as Search } from '../../Theme/Icons/Search.svg';
import { User } from '../../Interfaces';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';
import StyledInput from '../../components/Inputs/StyledInput/StyledInput';
import { Collapse } from '@mui/material';
import { SelectedContainer } from '../NewBet/NewBet.styles';
import {
  ParticipantsCollapseContainer,
  ParticipantsCollapseRow,
  AvatarWrapper,
  StyledAvatar,
  CloseButton,
  CloseIconStyled,
  NameText,
} from '../NewBet/NewBetComponents/Participants/Participants.styles';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';
import { formatPhoneNumber } from '../../utils/Helpers';
import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { useUsers } from '../Home/Hooks/useUsers';

interface ContactModalProps<T extends FieldValues> {
  open: boolean;
  handleClose: () => void;
  handleSave: (users: User[]) => void;
  control: Control<T>;
  inputName: Path<T>;
  limit?: number;
}

export type FormValues = {
  searchTerm: string;
};

const ContactModal = <T extends FieldValues>({
  open,
  handleClose,
  handleSave,
  inputName,
  limit,
}: ContactModalProps<T>) => {
  const { t } = useTranslation();
  const [user, setUser] = useAtom(userAtom);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { data, isSuccess } = useUsers({ enabled: open });
  const [contacts, setContacts] = useState<User[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchTerm(value);
      }, 300),
    []
  );

  const {
    register,
    watch,
    control: ControlS,
  } = useForm<FormValues>({
    defaultValues: {
      searchTerm: '',
    },
  });
  const searchTerm = watch('searchTerm');
  useEffect(() => {
    debouncedSetSearchTerm(searchTerm);
  }, [searchTerm, debouncedSetSearchTerm]);

  const handleUserClick = (user: User) => {
    if (limit && selectedUsers.length === limit) {
      return;
    }
    setSelectedUsers((prevSelected) =>
      prevSelected.some((selectedUser) => selectedUser.id === user.id)
        ? prevSelected.filter((selectedUser) => selectedUser.id !== user.id)
        : [...prevSelected, user]
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setContacts(data);
    }
  }, [data, isSuccess]);

  const removeUser = (item: User) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.filter((selectedUser) => selectedUser.id !== item.id)
    );
  };

  const handleSaveAndClose = () => {
    handleSave(selectedUsers);
    handleClose();
  };

  return (
    <PopUpOverlay isOpen={open} onClick={handleClose}>
      <PopUpDiv isOpen={open} onClick={(e) => e.stopPropagation()} padding>
        <PopUpHeader>
          <ReturnIcon onClick={handleSaveAndClose} />
          <Logo />
          <CloseIcon onClick={handleClose} />
        </PopUpHeader>
        <PopUpHeader2>
          <StyledInput
            placeholder={t(`ContactModal.search`)}
            startIcon={Search}
            typography="TextSmall"
            control={ControlS}
            inputName="searchTerm"
            {...register('searchTerm')}
          />
        </PopUpHeader2>
        {selectedUsers.length > 0 && (
          <Collapse
            in={Array.isArray(selectedUsers) && selectedUsers.length > 0}
            timeout="auto"
            unmountOnExit
          >
            <SelectedContainer>
              {Array.isArray(selectedUsers) &&
                selectedUsers.map((item: User, index: number) => (
                  <ParticipantsCollapseContainer key={index}>
                    <ParticipantsCollapseRow key={index}>
                      <AvatarWrapper>
                        <StyledAvatar> {item.fullName?.charAt(0)} </StyledAvatar>
                        <CloseButton onClick={() => removeUser(item)}>
                          <CloseIconStyled />
                        </CloseButton>
                      </AvatarWrapper>
                      <NameText>{item.fullName?.split(' ')[0]}</NameText>
                    </ParticipantsCollapseRow>
                  </ParticipantsCollapseContainer>
                ))}
            </SelectedContainer>
          </Collapse>
        )}
        <PopUpNotInContact>
          <AddContactIcon />
          <Typography value={t('ContactModal.notInContact')} variant={TypographyTypes.TextBig} />
        </PopUpNotInContact>
        <ItemsHeaderContent>
          <Typography value={t('ContactModal.contacts')} variant={TypographyTypes.H3} />
        </ItemsHeaderContent>
        <PopUpScroll>
          <ItemsContant>
            {contacts
              .filter(
                (item) =>
                  item.fullName?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                  item.phoneNumber?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
              )
              .filter((item) => item.id !== user?.id)
              .map((item, index) => (
                <ItemsBodyContent
                  key={index}
                  onClick={() => handleUserClick(item)}
                  style={{
                    background: selectedUsers.some((selectedUser) => selectedUser.id === item.id)
                      ? '#CEEFEA'
                      : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <ItemsNameImageCircleContent>
                    <SmallAvatar>{item.fullName?.charAt(0)}</SmallAvatar>
                    {item.fullName}
                  </ItemsNameImageCircleContent>
                  <Typography value={item.phoneNumber || ''} variant={TypographyTypes.H3} />
                </ItemsBodyContent>
              ))}
          </ItemsContant>
        </PopUpScroll>
      </PopUpDiv>
    </PopUpOverlay>
  );
};

export default ContactModal;
