import React from 'react';
import { FacebookIcon } from './ConnectionOptions.styles';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';
import { tokenAtom, userAtom } from '../../../Jotai/atoms';
import { useNavigate } from 'react-router-dom';
import { useRegisterProvider } from '../Hooks/useRegisterProvider';
import { VerifiedUserAtom } from '../Store/atoms';

interface facebookUser {
  name: string;
  email: string;
  id: string;
}

const FacebookLoginButton = () => {
  const { mutate } = useRegisterProvider();
  const [_, setActiveStep] = useAtom(UserActiveStep);
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const [, setVerifiedUser] = useAtom(VerifiedUserAtom);
  const [, setToken] = useAtom(tokenAtom);

  const handleFacebookLogin = () => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information...');
          FB.api('/me', { fields: 'name,email' }, (user: facebookUser) => {
            mutate(
              {
                UserData: { id: '-1', email: user.email, fullName: user.name },
                Provider: 'Facebook',
              },
              {
                onSuccess: (res) => {
                  if (res.initial) {
                    //register
                    setVerifiedUser(res.user.id);
                    setActiveStep(authSteps[AuthStepValueTypes.RegisterProvider]);
                  } else {
                    //login
                    localStorage.removeItem('AuthStep');
                    setToken(res.accessToken);
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
