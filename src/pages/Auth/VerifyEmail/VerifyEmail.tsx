import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useVerifyEmail } from '../Hooks/useVerifyEmail';
import BetLoader from '../../../Theme/Loader/loader';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying your email...');
  const navigate = useNavigate();
  const { mutate, isPending } = useVerifyEmail();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setMessage('Invalid verification link.');
      return;
    } else {
      mutate(token, {
        onSuccess: (data) => {
          if (!data) {
            navigate(`/home`);
          } else {
            alert('Error');
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onError: () => {},
      });
    }
  }, []);

  if (isPending) {
    return <BetLoader />;
  }

  return <h2>{message}</h2>;
};

export default VerifyEmail;
