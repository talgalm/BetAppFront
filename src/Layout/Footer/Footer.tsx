import { ButtonDiv, FooterComponent } from "./Footer.styles";
import { ReactComponent as ProfileIcon } from "../../Theme/Icons/ProfileFooterIcon.svg";
import { ReactComponent as HomeIcon } from "../../Theme/Icons/HomeFooterIcon.svg";

export const Footer = () =>{
    return (
      <FooterComponent>
        <ButtonDiv>
          <ProfileIcon width="24" height="24" />
          <HomeIcon width="24" height="24" />
        </ButtonDiv>
      </FooterComponent>
    );
}