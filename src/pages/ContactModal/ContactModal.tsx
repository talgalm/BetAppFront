import { Typography } from '../../components/Topography/topography';
import {
  ItemsBodyContent,
  ItemsContant,
  ItemsHeaderContent,
  ItemsNameImageCircleContent,
  PopUpDiv,
  PopUpHeader,
  PopUpNotInContact,
  PopUpOverlay,
  PopUpScroll,
  SmallAvatar,
} from './ContactModal.styles';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { ReactComponent as VIcon } from '../../Theme/Icons/VIcon.svg';
import { ReactComponent as AddContactIcon } from '../../Theme/Icons/ContactAdd.svg';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { ReactComponent as Search } from '../../Theme/Icons/Search.svg';
import { User } from '../../Interfaces';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';
import StyledInput from '../../components/Inputs/StyledInput/StyledInput';
import { useState } from 'react';
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

interface ContactModalProps<T extends FieldValues> {
  open: boolean;
  handleClose: () => void;
  handleSave: (users: User[]) => void;
  control: Control<T>;
  inputName: Path<T>;
  limit?: number;
}

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
      phoneNumber: '054-4363655',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '2',
      fullName: 'John Doe',
      phoneNumber: '054-1234567',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '3',
      fullName: 'Jane Smith',
      phoneNumber: '054-7654321',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '4',
      fullName: 'Mike Brown',
      phoneNumber: '054-9876543',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '5',
      fullName: 'Emily White',
      phoneNumber: '054-5432109',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '6',
      fullName: 'David Lee',
      phoneNumber: '054-6543210',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '7',
      fullName: 'Sarah Connor',
      phoneNumber: '054-1478523',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '8',
      fullName: 'Bruce Wayne',
      phoneNumber: '054-3698521',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '9',
      fullName: 'Clark Kent',
      phoneNumber: '054-7894561',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '10',
      fullName: 'Diana Prince',
      phoneNumber: '054-2589631',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '11',
      fullName: 'Peter Parker',
      phoneNumber: '054-3697412',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '12',
      fullName: 'Tony Stark',
      phoneNumber: '054-8529634',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '13',
      fullName: 'Steve Rogers',
      phoneNumber: '054-7418529',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '14',
      fullName: 'Natasha Romanoff',
      phoneNumber: '054-9632587',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '15',
      fullName: 'Wanda Maximoff',
      phoneNumber: '054-1597532',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '16',
      fullName: 'Stephen Strange',
      phoneNumber: '054-3571598',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '17',
      fullName: 'Nick Fury',
      phoneNumber: '054-9517534',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '18',
      fullName: 'Bucky Barnes',
      phoneNumber: '054-2581479',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '19',
      fullName: 'Scott Lang',
      phoneNumber: '054-7891236',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '20',
      fullName: 'Sam Wilson',
      phoneNumber: '054-3216547',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '21',
      fullName: "T'Challa",
      phoneNumber: '054-9873214',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '22',
      fullName: 'Loki Laufeyson',
      phoneNumber: '054-3698527',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '23',
      fullName: 'Carol Danvers',
      phoneNumber: '054-1472583',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '24',
      fullName: 'Gamora Zen',
      phoneNumber: '054-7413698',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '25',
      fullName: 'Rocket Raccoon',
      phoneNumber: '054-8521473',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '26',
      fullName: 'Groot',
      phoneNumber: '054-9637412',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '27',
      fullName: 'Drax the Destroyer',
      phoneNumber: '054-1593574',
      betsParticipating: [],
      betsSupervising: [],
      betsFinished: [],
    },
    {
      id: '28',
      fullName: 'Nebula',
      phoneNumber: '054-9514862',
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
          <VIcon onClick={handleSaveAndClose} />
          <Typography
            value={t('ContactModal.chooseContact')}
            variant={TypographyTypes.H1}
            styleProps={{ textAlign: 'center', width: '100%' }}
          />
          <CloseIcon onClick={handleClose} />
        </PopUpHeader>
        {/* {inputName && (
          <StyledInput
            extended={true}
            displayCharLimit={false}
            placeholder={t(`ContactModal.notInContact`)}
            startIcon={Search}
            typography="TextSmall"
          />
        )} */}
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
                  <Typography value={item.phoneNumber || ''} variant={TypographyTypes.H1} />
                </ItemsBodyContent>
              ))}
          </ItemsContant>
        </PopUpScroll>
      </PopUpDiv>
    </PopUpOverlay>
  );
};

export default ContactModal;
