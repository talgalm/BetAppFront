import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../components/Button - deprected/Button';
import Input from '../../components/Input - deprected/Input';
import { useLogin, useRegister } from '../../Hooks/useAuth';
import { validationRules } from '../../utils/Validations';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';
import withNoAuth from '../../Providers/withNoAuth';
import BetLoader from '../../Theme/Loader/loader';
import {
  FormContainer,
  HeadlineContainer,
  HeadlineSubTitle,
  HeadlineTitle,
  PageContainer,
  SubText,
} from './Register.styles';
import SocialIcons from '../SocialIcons/Icons';

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    register: registerFrom,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const { mutate: register, isPending: isRegistering } = useRegister();
  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const [, setUser] = useAtom(userAtom);

  const [showPassword] = useState(false);

  const onSubmit: SubmitHandler<RegisterFormInputs> = ({
    username,
    email,
    password,
    phoneNumber,
  }) => {
    register(
      { username, password, email, phoneNumber },
      {
        onSuccess: () => {
          login(
            { username, password },
            {
              onSuccess: (data) => {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                navigate('/');
              },
              onError: (error) => {
                console.error('Login failed after registration:', error);
              },
            }
          );
        },
        onError: (error) => {
          console.error('Registration failed:', error);
        },
      }
    );
  };

  const alreadyHaveAccount = () => {
    navigate('/login');
  };

  if (isRegistering || isLoggingIn) {
    return <BetLoader />;
  }

  return (
    <PageContainer>
      <HeadlineContainer>
        <HeadlineTitle>Create Account</HeadlineTitle>
        <HeadlineSubTitle>Create an account so you can start betting!</HeadlineSubTitle>
      </HeadlineContainer>

      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input<RegisterFormInputs>
            type="text"
            placeholder="Username"
            register={registerFrom}
            name="username"
            validation={validationRules.username}
            error={errors.username?.message}
          />
          <Input<RegisterFormInputs>
            type="email"
            placeholder="Email"
            register={registerFrom}
            name="email"
            validation={validationRules.email}
            error={errors.email?.message}
          />
          <Input<RegisterFormInputs>
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            register={registerFrom}
            name="password"
            validation={validationRules.password}
            error={errors.password?.message}
          />
          <Input<RegisterFormInputs>
            type="text"
            placeholder="Phone Number"
            register={registerFrom}
            name="phoneNumber"
            validation={validationRules.phoneNumber}
            error={errors.phoneNumber?.message}
          />
          <Button type="submit" label={isRegistering ? 'Registering...' : 'Register'} />
        </form>
      </FormContainer>
      <SubText onClick={alreadyHaveAccount}>Already have an account</SubText>
      <SocialIcons></SocialIcons>
    </PageContainer>
  );
};

export default withNoAuth(Register);
