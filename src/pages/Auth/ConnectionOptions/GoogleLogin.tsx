import { useGoogleLogin } from '@react-oauth/google';
import { GoogleIcon } from './ConnectionOptions.styles';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';
import { userAtom } from '../../../Jotai/atoms';
import { useNavigate } from 'react-router-dom';
import { useRegisterProvider } from '../Hooks/useRegisterProvider';

function GoogleLoginButton() {
  const { mutate: registerProvider } = useRegisterProvider();
  const [_, setActiveStep] = useAtom(UserActiveStep);
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      registerProvider(
        { Token: tokenResponse.access_token, Provider: 'Google' },
        {
          onSuccess: (res) => {
            console.log(res);
            if (res.initial) {
              //register
              localStorage.setItem('tempId', res.user.id);
              setActiveStep(authSteps[AuthStepValueTypes.RegisterProvider]);
            } else {
              //login
              localStorage.removeItem('AuthStep');
              localStorage.setItem('token', res.accessToken);
              setUser(res.user);
              navigate(`/home`);
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
