import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StyledSwitch from '../../components/Switch/Switch';
import { Container } from './Footer.styles';

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // show footer only on /home or /profile
  const visible = pathname.startsWith('/home') || pathname.startsWith('/profile');

  // internal toggle state mirrors the current route
  const [isHome, setIsHome] = useState(pathname.startsWith('/home'));

  /* 🔄  when the URL changes elsewhere in the app, keep the switch in sync */
  useEffect(() => {
    setIsHome(pathname.startsWith('/home'));
  }, [pathname]);

  /* 🔁  handle user toggle */
  const handleToggle = (next: boolean) => {
    setIsHome(next);
    navigate(next ? '/home' : '/profile', { replace: true }); // or remove replace if you want history
  };

  return (
    <Container data-visible={visible}>
      <StyledSwitch checked={isHome} onChange={handleToggle} />
    </Container>
  );
};

export default Footer;
