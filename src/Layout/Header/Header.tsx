import React, { useState } from "react";
import {
  ButtonsDiv,
  HeaderComponent,
  LogoDiv,
  PointText,
  TotalPointsDiv,
} from "./Header.styles";
import { ReactComponent as AddPeople } from "../../Theme/Icons/AddPeopleIcon.svg";
import { ReactComponent as Notification } from "../../Theme/Icons/Notification.svg";
import { ReactComponent as Logo } from "../../Theme/Icons/Logo.svg";
import { Typography } from "../../components/Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import Button from "../../components/Button/Button";
import { PRIMARY_BUTTON_COLOR } from "../../Theme/ColorTheme";
import { ReactComponent as AddIcon } from "../../Theme/Icons/AddIcon.svg";

const Header = () => {
  const [points, setPoints] = useState<number>(187);

  return (
    <HeaderComponent>
      <LogoDiv>
        <Logo width={56} height={24} />
      </LogoDiv>
      <TotalPointsDiv>
        <PointText>
          <Typography value={"נקודות"} variant={TypographyTypes.H6} />
        </PointText>
        <Typography value={points} variant={TypographyTypes.H1} />
      </TotalPointsDiv>
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
          onClick={() => {}}
        />
      </ButtonsDiv>
    </HeaderComponent>
  );
};

export default Header;
