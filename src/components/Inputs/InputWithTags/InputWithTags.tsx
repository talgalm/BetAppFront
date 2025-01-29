import { TypographyTypes } from '../../../Theme/Typography/typography';
import Circle from '../../Circle/CircleComponent';
import { Typography } from '../../Topography/topography';
import {
  AddParticipantsDiv,
  ParticipantTag,
  PopUpDiv,
  PopUpRow,
  TagContainer,
} from './InputWithTags.styles';
import { ReactComponent as AddIcon } from '../../../Theme/Icons/AddGray.svg';
import { User } from '../../../api/interfaces';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const InputWithTags = () => {
  const { t } = useTranslation();

  const users: User[] = [
    {
      username: 'TalG',
      fullName: 'טל גלמור',
      image: undefined,
    },
    {
      username: 'Vlad',
      image: undefined,
    },
    {
      username: 'Vlad',
      image: undefined,
    },
  ];
  const [currentOpen, setCurrentOpen] = useState<number>(-1);

  const handleOpenToggle = (index: number) => {
    setCurrentOpen((prev) => (prev === index ? -1 : index));
  };

  return (
    <AddParticipantsDiv>
      {users.map((user, index) => (
        <TagContainer key={user.username}>
          <ParticipantTag onClick={() => handleOpenToggle(index)}>
            <Circle key={index} index={index} participantsNumber={1} />
            <Typography value={user.fullName || user.username} variant={TypographyTypes.H4} />
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
      <ParticipantTag>
        <AddIcon />
        <Typography value={t('Input.TextTags.Add')} variant={TypographyTypes.H4} />
      </ParticipantTag>
    </AddParticipantsDiv>
  );
};

export default InputWithTags;
