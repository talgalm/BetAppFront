import { Typography } from '../../components/Topography/typography';
import {
  CornerFab,
  ItemsBodyContent,
  ItemsContant,
  ItemsHeaderContent,
  ItemsNameImageCircleContent,
  PopUpDiv,
  PopUpHeader2,
  PopUpNotInContact,
  PopUpOverlay,
  PopUpScroll,
  SmallAvatar,
} from './ContactModal.styles';
import { ReactComponent as AddContactIcon } from '../../Theme/Icons/ContactAdd.svg';
import { useTranslation } from 'react-i18next';
import { FieldValues, useForm } from 'react-hook-form';
import { ReactComponent as Search } from '../../Theme/Icons/Search.svg';
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
import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { useUsers } from '../Home/Hooks/useUsers';
import CheckIcon from '@mui/icons-material/Check';
import { useQueryClient } from '@tanstack/react-query';
import { User, Contact } from '../../Interfaces/User.interface';

interface ContactModalProp {
  open: boolean;
  handleClose: () => void;
  handleSave: (users: User[]) => void;
  limit?: number;
  limitContacts?: Contact[];
}

export type FormValues = {
  searchTerm: string;
};

const ContactModal = ({
  open,
  handleClose,
  handleSave,
  limit,
  limitContacts,
}: ContactModalProp) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);
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
    if (
      limitContacts &&
      limitContacts?.some((unableUser) => unableUser.phoneNumber === user.phoneNumber)
    ) {
      return;
    }
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
                        <StyledAvatar src={item.image}> {item.fullName?.charAt(0)} </StyledAvatar>
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
                    <SmallAvatar src={item.image}>{item.fullName?.charAt(0)}</SmallAvatar>
                    {item.fullName}
                  </ItemsNameImageCircleContent>
                  <Typography value={item.phoneNumber || ''} variant={TypographyTypes.H3} />
                </ItemsBodyContent>
              ))}
          </ItemsContant>
          <CornerFab color="primary" onClick={handleSaveAndClose}>
            <CheckIcon />
          </CornerFab>
        </PopUpScroll>
      </PopUpDiv>
    </PopUpOverlay>
  );
};

export default ContactModal;
