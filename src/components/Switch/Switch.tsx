import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { Typography } from '../Topography/typography';
import { TypographyTypes } from '../Topography/TypographyTypes';
import { useTranslation } from 'react-i18next';
import { ReactComponent as HomeIcon } from '@assets/icons/layoutIcons/SwitchHome.svg';
import { ReactComponent as ProfileIcon } from '@assets/icons/layoutIcons/SwitchProfile.svg';
import { PRIMARY_WHITE, SWITCH_GREY, SWITCH_WHITE, THIRD_GREEN } from '@theme/colorTheme';

const CustomSwitch = styled(Switch)({
  width: 335,
  height: 64,
  padding: 0,
  borderRadius: 32,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 8,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(160px)',
      color: 'red',
      '& + .MuiSwitch-track': {
        backgroundColor: SWITCH_WHITE,
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 160,
    height: 48,
    borderRadius: 28,
    backgroundColor: PRIMARY_WHITE,
  },
  '& .MuiSwitch-track': {
    borderRadius: 32,
    backgroundColor: SWITCH_WHITE,
    opacity: 1,
  },
});

export interface StyledSwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
}

export default function StyledSwitch({ checked, onChange }: StyledSwitchProps) {
  const { t } = useTranslation();

  return (
    <FormGroup>
      <Box sx={{ position: 'relative', width: '100%', height: 64 }}>
        {/* Left Side - Profile */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            pointerEvents: 'none',
            color: checked ? SWITCH_GREY : THIRD_GREEN,
          }}
        >
          <ProfileIcon />
          <Typography
            value={t('Switch.Profile')}
            variant={TypographyTypes.TextSmall}
            styleProps={{ color: checked ? SWITCH_GREY : '', fontSize: 10 }}
          />
        </Box>

        {/* Right Side - Home */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            pointerEvents: 'none',
            color: checked ? THIRD_GREEN : SWITCH_GREY,
          }}
        >
          <HomeIcon />
          <Typography
            value={t('Switch.Home')}
            variant={TypographyTypes.TextSmall}
            styleProps={{ color: checked ? '' : SWITCH_GREY, fontSize: 10 }}
          />
        </Box>

        <CustomSwitch checked={checked} onChange={(_, next) => onChange(next)} />
      </Box>
    </FormGroup>
  );
}
