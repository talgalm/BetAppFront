import { useGoogleLogin } from '@react-oauth/google';
import { useRegisterProvider } from '../../Hooks/useAuth';
import { GoogleIcon } from './ConnectionOptions.styles';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';

function GoogleLoginButton() {
  const { mutate: registerProvider } = useRegisterProvider();
  const [_, setActiveStep] = useAtom(UserActiveStep);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Access Token:', tokenResponse.access_token);

      registerProvider(
        { Token: tokenResponse.access_token, Provider: 'Google' },
        {
          onSuccess: (res) => {
            if (res.accses_toekn !== '') {
              //login
            } else {
              //register
              localStorage.setItem('tempId', res.user.id);
              setActiveStep(authSteps[AuthStepValueTypes.RegisterProvider]);
            }
          },
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
