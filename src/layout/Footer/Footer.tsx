import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StyledSwitch from '@components/Switch/Switch';
import { Container } from './Footer.styles';

const Footer = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  // show footer only on /home or /profile
  const visible =
    pathname.startsWith('/home') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/personal') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/support');

  // internal toggle state mirrors the current route
  const [isHome, setIsHome] = useState(pathname.startsWith('/home'));

  /* 🔄  when the URL changes elsewhere in the app, keep the switch in sync */
  useEffect(() => {
    setIsHome(pathname.startsWith('/home'));
  }, [pathname]);

  /* 🔁  handle user toggle */
  const handleToggle = (next: boolean) => {
    setIsHome(next);
    navigate(next ? '/home' : '/profile', { replace: true });
    // const layout = !isHome ? HeaderStyle.PRIMARY : HeaderStyle.PROFILE;
    // setHeader(layout);
  };

  return (
    <Container data-visible={visible}>
      <div style={{ marginBottom: 16 }}>
        <StyledSwitch checked={isHome} onChange={handleToggle} />
      </div>
    </Container>
  );
};

export default Footer;
