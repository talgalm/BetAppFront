import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import Circle from '../../Circle/CircleComponent';
import { Typography } from '../../Topography/topography';
import { ReactComponent as AddIcon } from '../../../Theme/Icons/AddGray.svg';
import { User } from '../../../api/interfaces';
import {
  AddParticipantsDiv,
  IconAddDiv,
  ParticipantTag,
  PopUpDiv,
  PopUpRow,
  TagContainer,
} from './InputWithTags.styles';
import ContactModal from '../../../pages/ContactModal/ContactModal';
import { FieldValues, Control } from 'react-hook-form';
import { Path } from 'react-router-dom';
import { userAtom } from '../../../Jotai/atoms';
import { useAtom } from 'jotai';

interface InputWithTagsProps<T extends FieldValues> {
  control: Control<T>;
  inputName: string;
  limit?: number;
}

const InputWithTags = <T extends FieldValues>({
  control,
  inputName,
  limit,
}: InputWithTagsProps<T>) => {
  const { t } = useTranslation();
  const [currentOpen, setCurrentOpen] = useState<number>(-1);
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

  const [user] = useAtom(userAtom);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleOpenToggle = (index: number) => {
    setCurrentOpen((prev) => (prev === index ? -1 : index));
  };

  const handlePopUpOpen = () => {
    setIsPopUpOpen(true);
  };
  const handlePopUpClose = () => {
    setIsPopUpOpen(false);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.some((selectedItem) => selectedItem.id === user.id)) {
        // Remove the user from the selectedUsers array
        return prevSelectedUsers.filter((selectedItem) => selectedItem.id !== user.id);
      } else {
        // Add the user to the selectedUsers array
        return [...prevSelectedUsers, user];
      }
    });
  };

  return (
    <AddParticipantsDiv>
      {selectedUsers.map((user, index) => (
        <TagContainer key={user.id}>
          <ParticipantTag onClick={() => handleOpenToggle(index)}>
            <Circle index={index} participantsNumber={1} styleProps={{ height: 24, width: 24 }} />
            <Typography
              value={user.fullName || user.id}
              variant={TypographyTypes.H4}
              styleProps={{ color: '#3254C5', fontWeight: 500 }}
            />
          </ParticipantTag>
          {currentOpen === index && (
            <PopUpDiv>
              <PopUpRow>
                <Typography
                  value={t('Input.TextTags.Remove')}
                  variant={TypographyTypes.H6}
                  styleProps={{ color: '#FF0000' }}
                />
                {'X'}
              </PopUpRow>
            </PopUpDiv>
          )}
        </TagContainer>
      ))}

      <IconAddDiv onClick={handlePopUpOpen}>
        <AddIcon width={18} height={18} />
      </IconAddDiv>

      <ContactModal
        open={isPopUpOpen}
        handlePopUpClose={handlePopUpClose}
        control={control}
        inputName={inputName}
        groups={user.groups || []}
        selectedUsers={selectedUsers}
        handleSelectUser={handleSelectUser}
        limit={limit}
      />
    </AddParticipantsDiv>
  );
};

export default InputWithTags;
