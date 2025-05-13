import { useState } from 'react';

import { Typography } from '../../../../components/Topography/topography';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ContactIcon } from '../../../../Theme/Icons/Contacts.svg';
import { User } from '../../../../Interfaces';
import { Control, FieldValues, Path, useController, useFormContext } from 'react-hook-form';
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
import { CreateBetInputs, Participant } from '../../Interface';
import { ErrorHandler } from '../../../../Errors/ErrorHandler';
import { useErrorBoundary } from 'react-error-boundary';
import { ErrorTypes } from '../../../../Errors/interface';
import { TypographyTypes } from '../../../../components/Topography/TypographyTypes';
import { useMostActives } from '../../Hooks/useMostActives';

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
  const [openModal, setOpenModal] = useState(false);
  const { watch } = useFormContext<CreateBetInputs>();
  const { showBoundary } = useErrorBoundary();
  const { data: mostActives = [], isLoading, error } = useMostActives(); // const { mostActives = [] } = useGetMostActives(user?.id);

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
      const userExists = watch().participents?.some((participant) => participant.id === user.id);
      if (userExists) {
        ErrorHandler(showBoundary, ErrorTypes.OverlappingParticipants);
      } else {
        finalUsers = [user];
      }
    }

    const arr: Participant[] = [];

    finalUsers.forEach((user: User) => {
      const parseUser: Participant = {
        phoneNumber: user.phoneNumber ?? '',
        fullName: user.fullName ?? '',
        id: user.id ?? '',
      };
      arr.push(parseUser);
    });

    onChange(arr);
  };

  const addUsers = (users: User[]) => {
    const currentUsers = Array.isArray(value) ? value : [];

    const newUsers = users.filter(
      (newUser) => !currentUsers.some((existingUser: User) => existingUser.id === newUser.id)
    );

    const updatedUsers = [...currentUsers, ...newUsers];

    onChange(limit ? updatedUsers.slice(0, limit) : updatedUsers);
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

  return (
    <>
      {!limit && (
        <Collapse
          in={Array.isArray(value) && value.length > 0}
          timeout="auto"
          unmountOnExit
          style={{ width: '100%' }}
        >
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
                    <NameText>{item.fullName?.slice(4)}</NameText>
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
          styleProps={{ marginBottom: 10, paddingRight: 6 }}
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
        {mostActives.length === 0 && <div>ss</div>}
      </ParticipantsContent>
      <StyledDivider />
      <RowCenterContentContainer onClick={() => setOpenModal(true)}>
        <ContactIcon />
        <Typography
          value={t(`NewBet.contacts`)}
          variant={TypographyTypes.TextBig}
          styleProps={{ color: PRIMARY_COLOR }}
        />
      </RowCenterContentContainer>
      {control && inputName && (
        <ContactModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          handleSave={addUsers}
          control={control}
          inputName={inputName}
          limit={limit}
        />
      )}
    </>
  );
};

export default NewBetParticipants;
