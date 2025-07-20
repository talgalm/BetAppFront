import { Typography } from '@components/Topography/typography';
import { HomeDivContainer, InputsContainer } from './PersonalPage.styles';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { PersonalInfoFormInput } from '@schemas/UpdatePersonalInfo';
import StyledInput from '@components/Inputs/StyledInput/StyledInput';
import { ReactComponent as EditIcon } from '@assets/icons/profileIcons/editIcon.svg';
import { SECONDARY_BLACK } from '@theme/colorTheme';

const Personal = () => {
  const { t } = useTranslation();
  const { control, getValues } = useFormContext<PersonalInfoFormInput>();

  console.log(getValues());

  return (
    <HomeDivContainer>
      <Typography value={t('Profile.personalInfo')} variant={TypographyTypes.H1} />
      <InputsContainer>
        <div>
          <StyledInput
            inputName="fullName"
            control={control}
            placeholder={t(`Personal.fullNameLabel`)}
            endIcon={EditIcon}
            label={t(`Personal.fullNameLabel`)}
          />
          <Typography
            value={t(`Personal.fullNameNote`)}
            variant={TypographyTypes.VerySmall}
            styleProps={{ paddingRight: 16, paddingTop: 5, color: SECONDARY_BLACK }}
          />
        </div>
        <div>
          <StyledInput
            inputName="email"
            control={control}
            placeholder={t(`Personal.emailLabel`)}
            endIcon={EditIcon}
            label={t(`Personal.emailLabel`)}
          />
          <Typography
            value={t(`Personal.emailNote`)}
            variant={TypographyTypes.VerySmall}
            styleProps={{ paddingRight: 16, paddingTop: 5, color: SECONDARY_BLACK }}
          />
        </div>
        <div>
          <StyledInput
            inputName="phoneNumber"
            control={control}
            placeholder={t(`Personal.phoneNumberLabel`)}
            endIcon={EditIcon}
            label={t(`Personal.phoneNumberLabel`)}
          />
          <Typography
            value={t(`Personal.phoneNumberNote`)}
            variant={TypographyTypes.VerySmall}
            styleProps={{ paddingRight: 16, paddingTop: 5, color: SECONDARY_BLACK }}
          />
        </div>
      </InputsContainer>
    </HomeDivContainer>
  );
};

export default Personal;
