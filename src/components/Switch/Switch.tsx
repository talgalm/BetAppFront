import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../Topography/TypographyTypes';
import { useTranslation } from 'react-i18next';
import { ReactComponent as HomeIcon } from '../../Theme/Icons/LayoutIcons/SwitchHome.svg';
import { ReactComponent as ProfileIcon } from '../../Theme/Icons/LayoutIcons/SwitchProfile.svg';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 328,
  height: 64,
  padding: 0,
  borderRadius: 32,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 8,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(160px)',
      color: '#4cafab',
    },
  },
  '& .MuiSwitch-thumb': {
    width: 160,
    height: 48,
    borderRadius: 28,
    backgroundColor: '#fff',
  },
  '& .MuiSwitch-track': {
    borderRadius: 32,
    backgroundColor: '#f2f1f8',
    opacity: 1,
  },
  '& .Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#f2f1f8',
    opacity: 1,
  },
}));

export default function StyledSwitch() {
  const { t } = useTranslation();
  const [checked, setChecked] = React.useState(false);

  return (
    <FormGroup>
      <Box sx={{ position: 'relative', width: 328, height: 64 }}>
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
            color: checked ? '#9e9e9e' : '#4cafab',
          }}
        >
          <ProfileIcon />
          <Typography
            value={t('Switch.Profile')}
            variant={TypographyTypes.TextSmall}
            styleProps={{ color: checked ? '#9e9e9e' : '', fontSize: 10 }}
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
            color: checked ? '#4cafab' : '#9e9e9e',
          }}
        >
          <HomeIcon />
          <Typography
            value={t('Switch.Home')}
            variant={TypographyTypes.TextSmall}
            styleProps={{ color: checked ? '' : '#9e9e9e', fontSize: 10 }}
          />
        </Box>

        <CustomSwitch checked={checked} onChange={() => setChecked(!checked)} />
      </Box>
    </FormGroup>
  );
}
