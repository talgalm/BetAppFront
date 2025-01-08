import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button - deprected/Button";
import Input from "../../components/Input - deprected/Input";
import {
  FormContainer,
  HeadlineContainer,
  HeadlineSubTitle,
  HeadlineTitle,
  PageContainer,
  SubText,
} from "./Login.styles";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../Hooks/useAuth";
import { userAtom } from "../../Jotai/atoms";
import { useAtom } from "jotai";
import withNoAuth from "../../Providers/withNoAuth";
import SocialIcons from "../SocialIcons/Icons";
import BetLoader from "../../Theme/Loader/loader";
import { useErrorBoundary } from "react-error-boundary";
import { ErrorHandler } from "../../Errors/ErrorHandler";

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { mutate, isPending } = useLogin();
  const [_, setUser] = useAtom(userAtom);
  const { showBoundary } = useErrorBoundary();

  const onSubmit: SubmitHandler<LoginFormInputs> = ({ username, password }) => {
    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          setUser(data.user);
          navigate("/");
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  };

  const createNewAccount = () => {
    ErrorHandler(showBoundary);
  };

  if (isPending) {
    return <BetLoader />;
  }

  return (
    <PageContainer>
      <HeadlineContainer>
        <HeadlineTitle>Login Here</HeadlineTitle>
        <HeadlineSubTitle>Welcome Back</HeadlineSubTitle>
        <HeadlineSubTitle>Youv'e been missed!</HeadlineSubTitle>
      </HeadlineContainer>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Username"
            register={register}
            name="username"
            validation={{ required: "Username is required" }}
            error={errors.username?.message}
          />
          <Input
            type="password"
            placeholder="Password"
            register={register}
            name="password"
            validation={{ required: "Password is required" }}
            error={errors.password?.message}
          />
          <Button type="submit" label={isPending ? "Logging in..." : "Login"} />
        </form>
      </FormContainer>
      <SubText onClick={createNewAccount}> Create new account</SubText>
      <SocialIcons></SocialIcons>
    </PageContainer>
  );
};

export default withNoAuth(Login);
