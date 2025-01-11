import BetLoader from "../../../Theme/Loader/loader";
import {
  BetNameDiv,
  ButtonsDiv,
  CheckboxDiv,
  IconsDiv,
  IconsDivRisk,
  LinkDiv,
  LogoDiv,
  OverlayContainer,
  ParticipantsDiv,
  RiskIcon,
} from "./SuccessfullNewBet.styles";
import { ReactComponent as LogoBright } from "../../../Theme/Icons/LogoWhite.svg";
import { Typography } from "../../../components/Topography/topography";
import { TypographyTypes } from "../../../Theme/Typography/typography";
import { TEXT_SEC_COLOR } from "../../../Theme/ColorTheme";
import { User } from "../../../api/interfaces";
import { ReactComponent as AddIcon } from "../../../Theme/Icons/Minus.svg";
import { ReactComponent as WhatsappIcon } from "../../../Theme/Icons/whatsapp.svg";
import { ReactComponent as LinkIcon } from "../../../Theme/Icons/link.svg";
import { ReactComponent as TelegramIcon } from "../../../Theme/Icons/telegram.svg";
import { ReactComponent as InstagramIcon } from "../../../Theme/Icons/instagram.svg";
import { ReactComponent as LinkedinIcon } from "../../../Theme/Icons/linkedin.svg";

import { AddParticipantTag } from "../../../components/Inputs/InputWithPoints/InputWithPoints.styles";
import { Checkbox } from "@mui/material";
import { StyledButton } from "../../NewBet/NewBet.styles";
import { useAtom } from "jotai";
import { layoutAtom } from "../../../Jotai/atoms";
import { HeaderStyle, FooterStyle } from "../../../Theme/ThemeInterfaces";
import { useNavigate } from "react-router-dom";

const SuccessfullNewBet = () => {
  const [layout, setLayout] = useAtom(layoutAtom);
  const navigate = useNavigate();

  const handleBackIconClick = () => {
    setLayout({
      headerStyle: HeaderStyle.PRIMARY_EXPAND,
      footerStyle: FooterStyle.SHOW,
    });
    navigate("/");
  };

  if (false) {
    return <BetLoader />;
  }

  let betName = "שם ההתערבות";
  const users: User[] = [
    {
      username: "TalG",
      fullName: "טל גלמור",
      image: undefined,
    },
    {
      username: "Vlad",
      image: undefined,
    },
    {
      username: "Vlad",
      image: undefined,
    },
  ];

  return (
    <OverlayContainer>
      <LogoDiv>
        <LogoBright width={56} height={24} />
      </LogoDiv>
      <BetNameDiv>
        <Typography
          value={`מזל טוב, יצרת את ההתערבות \n${betName}`}
          variant={TypographyTypes.H2}
          styleProps={{
            color: TEXT_SEC_COLOR,
          }}
        />
      </BetNameDiv>
      <ParticipantsDiv>
        <Typography
          value={"ההזמנה נשלחה למשתתפים:"}
          variant={TypographyTypes.H3}
          styleProps={{
            color: TEXT_SEC_COLOR,
          }}
        />
        {users.map((user) => (
          <AddParticipantTag>
            <AddIcon />
            <Typography
              value={user.fullName || user.username}
              variant={TypographyTypes.H4}
            />
          </AddParticipantTag>
        ))}
      </ParticipantsDiv>
      <LinkDiv>
        <Typography
          value={"לינק הזמנה אישי:"}
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
            "&.Mui-checked": {
              color: TEXT_SEC_COLOR,
            },
          }}
        />
        <Typography
          value={"לינק פתוח לכולם עם אפשרות להצטרף"}
          variant={TypographyTypes.H6}
          styleProps={{
            color: TEXT_SEC_COLOR,
          }}
        />
      </CheckboxDiv>
      <ParticipantsDiv>
        <Typography
          value={"דרג את רמת הסיכון"}
          variant={TypographyTypes.H3}
          styleProps={{
            color: TEXT_SEC_COLOR,
          }}
        />
        <Typography
          value={"הדירוג הוא לסטטיסטיקה האישית שלך"}
          variant={TypographyTypes.H6}
          styleProps={{
            color: TEXT_SEC_COLOR,
          }}
        />
        <IconsDivRisk>
          <RiskIcon>
            <Typography
              value={1}
              variant={TypographyTypes.H2}
              styleProps={{
                color: TEXT_SEC_COLOR,
              }}
            />
          </RiskIcon>
          <RiskIcon>
            <Typography
              value={2}
              variant={TypographyTypes.H2}
              styleProps={{
                color: TEXT_SEC_COLOR,
              }}
            />
          </RiskIcon>
          <RiskIcon>
            <Typography
              value={3}
              variant={TypographyTypes.H2}
              styleProps={{
                color: TEXT_SEC_COLOR,
              }}
            />
          </RiskIcon>
          <RiskIcon>
            <Typography
              value={4}
              variant={TypographyTypes.H2}
              styleProps={{
                color: TEXT_SEC_COLOR,
              }}
            />
          </RiskIcon>
          <RiskIcon>
            <Typography
              value={5}
              variant={TypographyTypes.H2}
              styleProps={{
                color: TEXT_SEC_COLOR,
              }}
            />
          </RiskIcon>
        </IconsDivRisk>
      </ParticipantsDiv>
      <ButtonsDiv>
        <StyledButton onClick={() => handleBackIconClick()}>
          <Typography
            value={"חזור למסך הבית"}
            variant={TypographyTypes.H5}
            styleProps={{ color: TEXT_SEC_COLOR }}
          />
        </StyledButton>
      </ButtonsDiv>
    </OverlayContainer>
  );
};
export default SuccessfullNewBet;
