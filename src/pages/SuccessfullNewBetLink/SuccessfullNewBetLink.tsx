import React from 'react';
import { CheckboxDiv, Container, IconsDiv, LinkDiv } from './SuccessfullNewBetLink.styles';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { TEXT_SEC_COLOR } from '../../Theme/ColorTheme';
import { ReactComponent as WhatsappIcon } from '../../Theme/Icons/whatsapp.svg';
import { ReactComponent as LinkIcon } from '../../Theme/Icons/link.svg';
import { ReactComponent as TelegramIcon } from '../../Theme/Icons/telegram.svg';
import { ReactComponent as InstagramIcon } from '../../Theme/Icons/instagram.svg';
import { ReactComponent as LinkedinIcon } from '../../Theme/Icons/linkedin.svg';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@mui/material';

const SuccessfullNewBetLink = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <LinkDiv>
        <Typography
          value={t('SuccessfullNewBet.PersonalLink')}
          variant={TypographyTypes.H3}
          styleProps={{
            color: TEXT_SEC_COLOR,
          }}
        />
        <IconsDiv>
          <LinkIcon />
          <TelegramIcon />
          <WhatsappIcon />
          <InstagramIcon />
          <LinkedinIcon />
        </IconsDiv>
      </LinkDiv>
      <CheckboxDiv>
        <Checkbox
          defaultChecked
          sx={{
            color: TEXT_SEC_COLOR,
            '&.Mui-checked': {
              color: TEXT_SEC_COLOR,
            },
          }}
        />
        <Typography
          value={t('SuccessfullNewBet.OpenLink')}
          variant={TypographyTypes.H6}
          styleProps={{
            color: TEXT_SEC_COLOR,
          }}
        />
      </CheckboxDiv>
    </Container>
  );
};

export default SuccessfullNewBetLink;
