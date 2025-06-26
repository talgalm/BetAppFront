import { useState } from 'react';

import { Typography } from '@components/Topography/typography';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ContactIcon } from '@assets/icons/Contacts.svg';
import { Control, FieldValues, Path, useController, useFormContext } from 'react-hook-form';
import Collapse from '@mui/material/Collapse';
import { PRIMARY_COLOR } from '@theme/colorTheme';
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
import { CreateBetInputs, Participant } from '../../new-bet-steps';
import { ErrorHandler } from '@errors/ErrorHandler';
import { useErrorBoundary } from 'react-error-boundary';
import { ErrorTypes } from '@errors/errors';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { useMostActives } from '../../Hooks/useMostActives';
import { useAtom } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@interfaces/User.interface';
import { layoutEphemeralAtom } from '@store/layoutAtoms';

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
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);
  const { data: mostActives = [] } = useMostActives();
  const [, setLayout] = useAtom(layoutEphemeralAtom);
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
        onChange(user);
      }
    }

    const arr: Participant[] = [];

    finalUsers.forEach((user: User & { status?: string }) => {
      const parseUser: Participant = {
        phoneNumber: user.phoneNumber ?? '',
        fullName: user.fullName ?? '',
        id: user.id ?? '',
        status: user.status ?? '',
        image: user.image ?? '',
      };
      arr.push(parseUser);
    });
    if (!limit) {
      onChange(arr);
    }
  };

  const addUsers = (users: User[]) => {
    const currentUsers = Array.isArray(value) ? value : [];

    const newUsers = users.filter(
      (newUser) => !currentUsers.some((existingUser: User) => existingUser.id === newUser.id)
    );

    const updatedUsers = [...currentUsers, ...newUsers];

    onChange(limit ? updatedUsers[0] : updatedUsers);
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

  const handleOpenContactModal = (state: boolean) => {
    setOpenModal(state);
    if (state) {
      setLayout({ overlay: () => setOpenModal(false) });
    } else {
      setLayout({ overlay: undefined });
    }
  };

  return (
    <>
      {!limit && value.filter((item: User) => item.id !== user?.id).length > 0 && (
        <Collapse
          in={Array.isArray(value) && value.length > 0}
          timeout="auto"
          unmountOnExit
          style={{ width: '100%' }}
        >
          <SelectedContainer>
            {Array.isArray(value) &&
              value
                .filter((item: User) => item.id !== user?.id)
                .map((item: User, index: number) => (
                  <ParticipantsCollapseContainer key={index}>
                    <ParticipantsCollapseRow key={index}>
                      <AvatarWrapper>
                        <StyledAvatar src={item.image}>{item.fullName?.charAt(0)}</StyledAvatar>
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
      <ParticipantsContent>
        {mostActives.length > 0 && (
          <Typography
            value={t(`NewBet.mostActives`)}
            variant={TypographyTypes.H2}
            styleProps={{ marginBottom: 10, paddingRight: 6 }}
          />
        )}
        {mostActives.length > 0 &&
          mostActives.map((item, index) => (
            <ParticipantsContentRow
              key={index}
              onClick={() => handleUserClick(item)}
              background={isUserSelected(item)}
            >
              <ParticipantsContentUser>
                <SmallAvatar src={item.image}>{item.fullName?.charAt(0)} </SmallAvatar>
                <Typography value={item.fullName || ''} variant={TypographyTypes.TextMedium} />
              </ParticipantsContentUser>
              <Typography value={item.phoneNumber || ''} variant={TypographyTypes.TextMedium} />
            </ParticipantsContentRow>
          ))}
        {mostActives.length === 0 && <div></div>}
      </ParticipantsContent>
      <StyledDivider />
      <RowCenterContentContainer onClick={() => handleOpenContactModal(true)}>
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
          handleClose={() => handleOpenContactModal(false)}
          handleSave={addUsers}
          // control={control}
          // inputName={inputName}
          limit={limit}
        />
      )}
    </>
  );
};

export default NewBetParticipants;
