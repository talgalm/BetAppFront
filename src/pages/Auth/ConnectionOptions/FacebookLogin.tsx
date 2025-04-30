import { FacebookIcon } from './ConnectionOptions.styles';

function FacebookLoginButton() {
  const handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_BET_BASE_URL}/auth/facebook`;
  };

  return <FacebookIcon onClick={handleFacebookLogin} style={{ cursor: 'pointer' }} />;
}

export default FacebookLoginButton;
