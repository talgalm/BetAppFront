import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BetNameInput, PageContainer } from './NewBet.styles';
import FormInputCollapse from '../FormInputCollapse/FormInputCollapse';
import { ReactComponent as AddIcon } from '../../Theme/Icons/AddIcon.svg';
import SuccessfullNewBet from '../SuccessfullNewBet/SuccessfullNewBet';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { TEXT_SEC_COLOR } from '../../Theme/ColorTheme';
import { newBetsFieldsData, CollapseTitles, CreateFormInputs } from './Interface';
import { useFormContext } from 'react-hook-form';
import StyledButton from '../../components/Button/StyledButton';

const NewBet = () => {
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const [currentOpen, setCurrentOpen] = useState<CollapseTitles | null>(null);
  const { t } = useTranslation();
  const [addToCalendar, setAddToCalendar] = useState(true);

  const { register, control, handleSubmit } = useFormContext<CreateFormInputs>();

  const handleCollapseToggle = (title: CollapseTitles) => {
    setCurrentOpen((prev) => (prev === title ? null : title));
  };

  const onSubmit = (data: CreateFormInputs) => {
    setAddToCalendar(data.AddTocalendar);
    setIsSuccessfull(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setCurrentOpen(CollapseTitles.DESCRIPTION);
    }
  };

  return (
    <PageContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <BetNameInput
          {...register('Name')}
          placeholder={t('NewBet.BetNameInput')}
          typography={TypographyTypes.H2}
          onKeyDown={onKeyDown}
        />
        {newBetsFieldsData.map(({ title, label, icon, type, inputName }) => (
          <FormInputCollapse<CreateFormInputs>
            key={title}
            title={t(label)}
            icon={icon}
            type={type}
            isOpen={currentOpen === title}
            onToggle={() => handleCollapseToggle(title)}
            inputName={inputName as keyof CreateFormInputs}
            control={control}
          />
        ))}
        <div style={{ marginTop: 'auto', marginBottom: 0 }}>
          <StyledButton value={t('NewBet.createBet')} icon={<AddIcon color={TEXT_SEC_COLOR} />} />
        </div>
      </form>

      {isSuccessfull && <SuccessfullNewBet isAddToCalendar={addToCalendar} />}
    </PageContainer>
  );
};

export default NewBet;
