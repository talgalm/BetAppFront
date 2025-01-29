import { ButtonDiv, FooterComponent } from './Footer.styles';
import { ReactComponent as ProfileIcon } from '../../Theme/Icons/ProfileFooterIcon.svg';
import { ReactComponent as HomeIcon } from '../../Theme/Icons/HomeFooterIcon.svg';
import { useAtom } from 'jotai';
import { layoutAtom } from '../../Jotai/atoms';

export const Footer = () => {
  const [layout] = useAtom(layoutAtom);
  return (
    <FooterComponent footerStyle={layout.footerStyle}>
      <ButtonDiv>
        <ProfileIcon width="24" height="24" />
        <HomeIcon width="24" height="24" />
      </ButtonDiv>
    </FooterComponent>
  );
};
