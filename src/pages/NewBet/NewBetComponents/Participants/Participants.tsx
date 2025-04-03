import React from 'react';

import { Typography } from '../../../../components/Topography/topography';
import { TypographyTypes } from '../../../../Theme/Typography/typography';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ContactIcon } from '../../../../Theme/Icons/Contacts.svg';
import { User } from '../../../../api/interfaces';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Collapse from '@mui/material/Collapse';
import { PRIMARY_COLOR } from '../../../../Theme/ColorTheme';
import {
  AvatarWrapper,
  CloseButton,
  CloseIconStyled,
  NameText,
  ParticipantsCollapseContainer,
  ParticipantsCollapseRow,
  ParticipantsContent,
  ParticipantsContentRow,
  ParticipantsContentUser,
  RowCenterContentContainer,
  SelectedContainer,
  SmallAvatar,
  StyledAvatar,
  StyledDivider,
} from '../Participants/Participants.styles';
import ContactModal from '../../../ContactModal/ContactModal';

interface NewBetParticipantsProps<T extends FieldValues> {
  limit?: number;
  control?: Control<T>;
  inputName?: Path<T> | undefined;
}

const NewBetParticipants = <T extends FieldValues>({
  limit,
  inputName,
  control,
}: NewBetParticipantsProps<T>): JSX.Element => {
  const { t } = useTranslation();
  // const { mostActives = [] } = useGetMostActives(user?.id);

  const {
    field: { value, onChange },
  } = useController({
    control,
    name: inputName || ('' as Path<T>),
  });

  const handleUserClick = (user: User) => {
    const currentUsers = Array.isArray(value) ? value : [];

    const isUserSelected = currentUsers.some((selectedUser: User) => selectedUser.id === user.id);

    const updatedUsers = isUserSelected
      ? currentUsers.filter((selectedUser: User) => selectedUser.id !== user.id)
      : [...currentUsers, user];

    let finalUsers = limit ? updatedUsers.slice(0, limit) : updatedUsers;

    if (limit && finalUsers[0].id !== user.id) {
      removeUser(user);
      finalUsers = [user];
    }
    onChange(finalUsers);
  };

  const removeUser = (user: User) => {
    const currentUsers = Array.isArray(value) ? value : [];
    const updatedUsers = currentUsers.filter((selectedUser: User) => selectedUser.id !== user.id);
    onChange(updatedUsers);
  };

  const isUserSelected = (user: User) => {
    const currentUsers = Array.isArray(value) ? value : [];
    return currentUsers.some((selectedUser: User) => selectedUser.id === user.id);
  };

  const mostActives: User[] = [
    { id: 'TalGalmor', fullName: 'Tal Galmor', phoneNumber: '054-4363655' },
    { id: 'JohnDoe', fullName: 'John Doe', phoneNumber: '054-1234567' },
    { id: 'JaneSmith', fullName: 'Jane Smith', phoneNumber: '054-7654321' },
    { id: 'MikeBrown', fullName: 'Mike Brown', phoneNumber: '054-9876543' },
    { id: 'EmilyWhite', fullName: 'Emily White', phoneNumber: '054-5432109' },
  ];

  return (
    <>
      {!limit && (
        <Collapse in={Array.isArray(value) && value.length > 0} timeout="auto" unmountOnExit>
          <SelectedContainer>
            {Array.isArray(value) &&
              value.map((item: User, index: number) => (
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
      <ParticipantsContent>
        <Typography
          value={t(`NewBet.mostActives`)}
          variant={TypographyTypes.H2}
          styleProps={{ marginBottom: 10 }}
        />
        {mostActives.length > 0 &&
          mostActives.map((item, index) => (
            <ParticipantsContentRow
              key={index}
              onClick={() => handleUserClick(item)}
              background={isUserSelected(item)}
            >
              <ParticipantsContentUser>
                <SmallAvatar>{item.fullName?.charAt(0)} </SmallAvatar>
                <Typography value={item.fullName || ''} variant={TypographyTypes.TextMedium} />
              </ParticipantsContentUser>
              <Typography value={item.phoneNumber || ''} variant={TypographyTypes.TextMedium} />
            </ParticipantsContentRow>
          ))}
      </ParticipantsContent>
      <StyledDivider />
      <RowCenterContentContainer>
        <ContactIcon />
        <Typography
          value={t(`NewBet.contacts`)}
          variant={TypographyTypes.H10}
          styleProps={{ color: PRIMARY_COLOR }}
        />
      </RowCenterContentContainer>
      {control && inputName && (
        <ContactModal
          open={true}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          handlePopUpClose={() => {}}
          control={control}
          inputName={inputName}
          groups={[]}
          selectedUsers={[]}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          handleSelectUser={() => {}}
          limit={limit}
        />
      )}
    </>
  );
};

export default NewBetParticipants;
