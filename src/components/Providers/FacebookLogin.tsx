import React from 'react';
import { FacebookIcon } from '../../pages/Login/Login.styles';

interface facebookUser {
  name: string;
  email: string;
  id: string;
}

const FacebookLoginButton = () => {
  const handleFacebookLogin = () => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information...');
          FB.api('/me', { fields: 'name,email' }, (user: facebookUser) => {
            console.log('Good to see you, ' + user.name + '.');
            // Here you would typically send the user's information
            // (user.id, user.name, user.email) to your backend
            // for registration or login.
            console.log('Facebook User Data:', user);
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
