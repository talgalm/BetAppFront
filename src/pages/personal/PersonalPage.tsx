import { Typography } from '@components/Topography/typography';
import { HomeDivContainer, InputsContainer } from './PersonalPage.styles';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { PersonalInfoFormInput } from '@schemas/UpdatePersonalInfo';
import StyledInput from '@components/Inputs/StyledInput/StyledInput';
import { ReactComponent as EditIcon } from '@assets/icons/profileIcons/editIcon.svg';
import { SECONDARY_BLACK } from '@theme/colorTheme';
import { useMemo, useEffect, useState, useCallback } from 'react';
import StyledButton from '@components/Button/StyledButton';
import { useUpdateUser } from '@pages/auth/hooks/useUpdateUser';
import { useProfile } from '@providers/useProfile';

interface FieldConfig {
  name: keyof PersonalInfoFormInput;
  labelKey: string;
  noteKey: string;
}

const Personal = () => {
  const { t } = useTranslation();
  const { mutate, isPending } = useUpdateUser();
  const {
    control,
    watch,
    formState: { defaultValues },
    reset,
  } = useFormContext<PersonalInfoFormInput>();
  const { data: profile } = useProfile();

  const watchedValues = watch();
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [changedFields, setChangedFields] = useState<Partial<PersonalInfoFormInput>>({});

  useEffect(() => {
    if (defaultValues) {
      const changes: Partial<PersonalInfoFormInput> = {};
      let hasAnyChanges = false;

      Object.keys(defaultValues).forEach((key) => {
        const fieldKey = key as keyof PersonalInfoFormInput;
        const currentValue = watchedValues[fieldKey];
        const defaultValue = defaultValues[fieldKey];

        if (currentValue !== defaultValue) {
          changes[fieldKey] = currentValue;
          hasAnyChanges = true;
        }
      });

      setHasChanges(hasAnyChanges);
      setChangedFields(changes);
    }
  }, [watchedValues, defaultValues]);

  const handleUpdate = useCallback(() => {
    if (Object.keys(changedFields).length > 0) {
      const updatePayload = {
        id: profile?.id || '',
        ...changedFields,
      };

      mutate(updatePayload, {
        onSuccess: () => {
          reset(watchedValues);
        },
        onError: (error) => {
          console.error('Update failed:', error);
        },
      });
    }
  }, [changedFields, profile?.id, mutate, reset, watchedValues]);

  const fields: FieldConfig[] = useMemo(
    () => [
      {
        name: 'fullName',
        labelKey: 'Personal.fullNameLabel',
        noteKey: 'Personal.fullNameNote',
      },
      {
        name: 'email',
        labelKey: 'Personal.emailLabel',
        noteKey: 'Personal.emailNote',
      },
      {
        name: 'phoneNumber',
        labelKey: 'Personal.phoneNumberLabel',
        noteKey: 'Personal.phoneNumberNote',
      },
    ],
    []
  );

  const renderField = ({ name, labelKey, noteKey }: FieldConfig) => (
    <div key={name}>
      <StyledInput
        inputName={name}
        control={control}
        placeholder={t(labelKey)}
        endIcon={EditIcon}
        label={t(labelKey)}
      />
      <Typography
        value={t(noteKey)}
        variant={TypographyTypes.VerySmall}
        styleProps={{
          paddingRight: 16,
          paddingTop: 5,
          color: SECONDARY_BLACK,
        }}
      />
    </div>
  );

  return (
    <HomeDivContainer>
      <Typography value={t('Profile.personalInfo')} variant={TypographyTypes.H1} />
      <InputsContainer>{fields.map(renderField)}</InputsContainer>

      <StyledButton
        value={isPending ? t('Personal.updating') : t('Personal.update')}
        onClick={handleUpdate}
        disabled={!hasChanges || isPending}
        styleProps={{ marginTop: 16 }}
      />
    </HomeDivContainer>
  );
};

export default Personal;
