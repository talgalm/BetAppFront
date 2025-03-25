import { ContentContainer, RowContentContainer } from '../NewBet.styles';
import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, Path } from 'react-hook-form';
import InputTextFull from '../../../components/Inputs/InputTextFull/InputTextFull';
import Calendar from '../../../components/Calendar/Calendar';

interface NewBetProps<T extends FieldValues> {
  type?: string;
  control?: Control<T>;
  inputName?: Path<T>;
}

const NewBetDeadline = <T extends FieldValues>({
  type,
  inputName,
  control,
}: NewBetProps<T>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <ContentContainer>
      <RowContentContainer>
        <Typography
          value={t(`NewBet.${type}Title`)}
          variant={TypographyTypes.H2}
          styleProps={{ color: 'black' }}
        />
      </RowContentContainer>
      <RowContentContainer>
        <Typography
          value={t(`NewBet.${type}Subtitle`)}
          variant={TypographyTypes.H4}
          styleProps={{ color: 'black' }}
        />
      </RowContentContainer>
      {inputName && control && <Calendar control={control} inputName={inputName} />}
    </ContentContainer>
  );
};

export default NewBetDeadline;
