import React from "react";
import { IconsDiv, IconStyle, LoginWithSocialDiv } from "./Icons.styles";
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaApple } from "react-icons/fa";

export default function SocialIcons() {
  return (
    <LoginWithSocialDiv>
      <>Or continue with</>
      <IconsDiv>
        <IconStyle
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#1877F2" }}
        >
          <FaFacebookF size={12} />
        </IconStyle>
        <IconStyle
          href="https://accounts.google.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#DB4437" }}
        >
          <FaGoogle size={12} />
        </IconStyle>
        <IconStyle
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#0A66C2" }}
        >
          <FaLinkedinIn size={12} />
        </IconStyle>
        <IconStyle
          href="https://apple.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#000000" }}
        >
          <FaApple size={12} />
        </IconStyle>
      </IconsDiv>
    </LoginWithSocialDiv>
  );
}
