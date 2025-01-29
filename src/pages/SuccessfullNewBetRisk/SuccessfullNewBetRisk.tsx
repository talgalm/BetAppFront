import { Container, IconsDivRisk, ParticipantsDiv, RiskIcon } from './SuccessfullNewBetRisk.styles';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { TEXT_SEC_COLOR } from '../../Theme/ColorTheme';
import { useTranslation } from 'react-i18next';

const SuccessfullNewBetRisk = () => {
  const { t } = useTranslation();
  const risks = [1, 2, 3, 4, 5];

  return (
    <Container>
      <ParticipantsDiv>
        <Typography
          value={t('SuccessfullNewBet.RankRisk')}
          variant={TypographyTypes.H3}
          styleProps={{ color: TEXT_SEC_COLOR }}
        />
        <Typography
          value={t('SuccessfullNewBet.RankUsage')}
          variant={TypographyTypes.H6}
          styleProps={{ color: TEXT_SEC_COLOR }}
        />
        <IconsDivRisk>
          {risks.map((risk) => (
            <RiskIcon key={risk}>
              <Typography
                value={risk}
                variant={TypographyTypes.H2}
                styleProps={{ color: TEXT_SEC_COLOR }}
              />
            </RiskIcon>
          ))}
        </IconsDivRisk>
      </ParticipantsDiv>
    </Container>
  );
};

export default SuccessfullNewBetRisk;
