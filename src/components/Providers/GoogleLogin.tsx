import { useGoogleLogin } from '@react-oauth/google';
import { useRegisterProvider } from '../../Hooks/useAuth';
import { GoogleIcon } from '../../pages/Login/Login.styles';

function GoogleLoginButton() {
  const { mutate: registerProvider } = useRegisterProvider();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Access Token:', tokenResponse.access_token);

      registerProvider(
        { Token: tokenResponse.access_token, Provider: 'Google' },
        {
          onSuccess: () => console.log('!'),
          onError: (error: any) => {
            console.error('Registration failed:', error);
            alert('');
          },
        }
      );
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return <GoogleIcon onClick={() => login()} style={{ cursor: 'pointer' }} />;
}

export default GoogleLoginButton;
