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

  const fakeContacs: User[] = [
    {
      id: '1',
      fullName: 'Tal Galmor',
      phoneNumber: '0544363655',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '2',
      fullName: 'John Doe',
      phoneNumber: '0541234567',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '3',
      fullName: 'Jane Smith',
      phoneNumber: '0547654321',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '4',
      fullName: 'Mike Brown',
      phoneNumber: '0549876543',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '5',
      fullName: 'Emily White',
      phoneNumber: '0545432109',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '6',
      fullName: 'David Lee',
      phoneNumber: '0546543210',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '7',
      fullName: 'Sarah Connor',
      phoneNumber: '0541478523',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '8',
      fullName: 'Bruce Wayne',
      phoneNumber: '0543698521',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '9',
      fullName: 'Clark Kent',
      phoneNumber: '0547894561',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '10',
      fullName: 'Diana Prince',
      phoneNumber: '0542589631',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '11',
      fullName: 'Peter Parker',
      phoneNumber: '0543697412',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '12',
      fullName: 'Tony Stark',
      phoneNumber: '0548529634',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '13',
      fullName: 'Steve Rogers',
      phoneNumber: '0547418529',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '14',
      fullName: 'Natasha Romanoff',
      phoneNumber: '0549632587',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '15',
      fullName: 'Wanda Maximoff',
      phoneNumber: '0541597532',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '16',
      fullName: 'Stephen Strange',
      phoneNumber: '0543571598',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '17',
      fullName: 'Nick Fury',
      phoneNumber: '0549517534',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '18',
      fullName: 'Bucky Barnes',
      phoneNumber: '0542581479',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '19',
      fullName: 'Scott Lang',
      phoneNumber: '0547891236',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '20',
      fullName: 'Sam Wilson',
      phoneNumber: '0543216547',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '21',
      fullName: "T'Challa",
      phoneNumber: '0549873214',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '22',
      fullName: 'Loki Laufeyson',
      phoneNumber: '0543698527',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '23',
      fullName: 'Carol Danvers',
      phoneNumber: '0541472583',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '24',
      fullName: 'Gamora Zen',
      phoneNumber: '0547413698',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '25',
      fullName: 'Rocket Raccoon',
      phoneNumber: '0548521473',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '26',
      fullName: 'Groot',
      phoneNumber: '0549637412',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '27',
      fullName: 'Drax the Destroyer',
      phoneNumber: '0541593574',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '28',
      fullName: 'Nebula',
      phoneNumber: '0549514862',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
  ];

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
                      <NameText>{item.fullName}</NameText>
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
            {fakeContacs
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
                  <Typography
                    value={formatPhoneNumber(item.phoneNumber) || ''}
                    variant={TypographyTypes.H3}
                  />
                </ItemsBodyContent>
              ))}
          </ItemsContant>
        </PopUpScroll>
      </PopUpDiv>
    </PopUpOverlay>
  );
};

export default ContactModal;
