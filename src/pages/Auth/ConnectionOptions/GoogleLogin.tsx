import { GoogleIcon } from './ConnectionOptions.styles';
import { useQueryClient } from '@tanstack/react-query';

function GoogleLoginButton() {
  const queryClient = useQueryClient();

  const handleGoogleLogin = () => {
    queryClient.clear();
    window.location.href = `http://localhost:3001/auth/google`;
  };

  return <GoogleIcon onClick={handleGoogleLogin} style={{ cursor: 'pointer' }} />;
}

export default GoogleLoginButton;
