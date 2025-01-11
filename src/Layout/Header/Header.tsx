import { useState } from "react";
import {
  BackArrowDiv,
  ButtonsDiv,
  HeaderComponent,
  LogoDiv,
  PointText,
  TotalPointsDiv,
} from "./Header.styles";
import { ReactComponent as AddPeople } from "../../Theme/Icons/AddPeopleIcon.svg";
import { ReactComponent as Notification } from "../../Theme/Icons/Notification.svg";
import { ReactComponent as LogoBright } from "../../Theme/Icons/LogoWhite.svg";
import { ReactComponent as LogoDark } from "../../Theme/Icons/LogoDark.svg";
import { ReactComponent as ArrowRightDark } from "../../Theme/Icons/ArrowRightDark.svg";
import { Typography } from "../../components/Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import Button from "../../components/Button - deprected/Button";
import {
  PRIMARY_BUTTON_COLOR,
  TEXT_SEC_COLOR,
  TEXT_THIRD_COLOR,
} from "../../Theme/ColorTheme";
import { ReactComponent as AddIcon } from "../../Theme/Icons/AddIcon.svg";
import { layoutAtom } from "../../Jotai/atoms";
import { useAtom } from "jotai";
import { FooterStyle, HeaderStyle } from "../../Theme/ThemeInterfaces";
import { useNavigate } from "react-router-dom";
import { useIsPrimaryExpand } from "../../utils/Helpers";

const Header = () => {
  const isPrimary = useIsPrimaryExpand();

  const [points, setPoints] = useState<number>(187);
  const [layout, setLayout] = useAtom(layoutAtom);

  const navigate = useNavigate();

  const handleAddIconClick = () => {
    setLayout({
      headerStyle: HeaderStyle.SECONDARY_SHORT,
      footerStyle: FooterStyle.HIDE,
    });
    navigate("/create-bet");
  };
  const handleBackIconClick = () => {
    setLayout({
      headerStyle: HeaderStyle.PRIMARY_EXPAND,
      footerStyle: FooterStyle.SHOW,
    });
    navigate("/");
  };

  return (
    <HeaderComponent headerStyle={layout.headerStyle}>
      <LogoDiv>
        {isPrimary ? (
          <LogoBright width={56} height={24} />
        ) : (
          <LogoDark width={56} height={24} />
        )}
      </LogoDiv>
      <TotalPointsDiv>
        <PointText>
          <Typography
            value={"נקודות"}
            variant={TypographyTypes.H6}
            styleProps={{
              color: isPrimary ? TEXT_SEC_COLOR : TEXT_THIRD_COLOR,
            }}
          />
        </PointText>
        <Typography value={points} variant={TypographyTypes.H1} />
      </TotalPointsDiv>
      {isPrimary && (
        <ButtonsDiv>
          <Button
            bgColor={PRIMARY_BUTTON_COLOR}
            icon={<Notification width={24} height={24} />}
            onClick={() => {}}
          />
          <Button
            bgColor={PRIMARY_BUTTON_COLOR}
            icon={<AddPeople width={24} height={24} />}
            onClick={() => {}}
          />
          <Button
            bgColor={PRIMARY_BUTTON_COLOR}
            icon={<AddIcon width={24} height={24} />}
            onClick={handleAddIconClick}
          />
        </ButtonsDiv>
      )}
      <BackArrowDiv>
        {!isPrimary && (
          <ArrowRightDark
            width={24}
            height={24}
            onClick={handleBackIconClick}
          />
        )}
      </BackArrowDiv>
    </HeaderComponent>
  );
};

export default Header;
