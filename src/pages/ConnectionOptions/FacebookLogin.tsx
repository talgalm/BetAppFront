import React from 'react';
import { FacebookIcon } from './ConnectionOptions.styles';
import { useRegisterProvider } from '../../Hooks/useAuth';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';
import { userAtom } from '../../Jotai/atoms';
import { useNavigate } from 'react-router-dom';

interface facebookUser {
  name: string;
  email: string;
  id: string;
}

const FacebookLoginButton = () => {
  const { mutate: registerProvider } = useRegisterProvider();
  const [_, setActiveStep] = useAtom(UserActiveStep);
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleFacebookLogin = () => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information...');
          FB.api('/me', { fields: 'name,email' }, (user: facebookUser) => {
            registerProvider(
              {
                UserData: { id: '-1', email: user.email, fullName: user.name },
                Provider: 'Facebook',
              },
              {
                onSuccess: (res) => {
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
          });
        } else {
          console.log('User cancelled login or did not authorize.');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  return <FacebookIcon onClick={handleFacebookLogin} />;
};

export default FacebookLoginButton;
