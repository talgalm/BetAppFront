// import { useGoogleLogin } from '@react-oauth/google';
// import { GoogleIcon } from './ConnectionOptions.styles';
// import { useAtom } from 'jotai';
// import { UserActiveStep } from '../../../Jotai/UserAtoms';
// import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';
// import { tokenAtom, userAtom } from '../../../Jotai/atoms';
// import { useNavigate } from 'react-router-dom';
// import { useRegisterProvider } from '../Hooks/useRegisterProvider';
// import { VerifiedUserAtom } from '../Store/atoms';

import { GoogleIcon } from './ConnectionOptions.styles';

// function GoogleLoginButton() {
//   const { mutate } = useRegisterProvider();
//   const [_, setActiveStep] = useAtom(UserActiveStep);
//   const [, setUser] = useAtom(userAtom);
//   const navigate = useNavigate();
//   const [, setVerifiedUser] = useAtom(VerifiedUserAtom);
//   const [, setToken] = useAtom(tokenAtom);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       mutate(
//         { Token: tokenResponse.access_token, Provider: 'Google' },
//         {
//           onSuccess: (res) => {
//             console.log(res);
//             if (res.initial) {
//               //register
//               setVerifiedUser(res.user.id);
//               setActiveStep(authSteps[AuthStepValueTypes.RegisterProvider]);
//             } else {
//               //login
//               localStorage.removeItem('AuthStep');
//               setToken(res.accessToken);
//               setUser(res.user);
//               navigate(`/home`);
//             }
//           },
//           onError: (error: any) => {
//             console.error('Registration failed:', error);
//             alert('');
//           },
//         }
//       );
//     },
//     onError: () => {
//       console.log('Login Failed');
//     },
//   });

//   return <GoogleIcon onClick={() => login()} style={{ cursor: 'pointer' }} />;
// }

// export default GoogleLoginButton;

function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:3001/auth/google`;
  };

  return <GoogleIcon onClick={handleGoogleLogin} style={{ cursor: 'pointer' }} />;
}

export default GoogleLoginButton;
