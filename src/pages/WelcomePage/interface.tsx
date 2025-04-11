export enum AuthStepValueTypes {
  Welcome = 'Welcome',
  Login = 'Login',
  RegisterInfo = 'RegisterInfo',
  RegisterPassword = 'RegisterPassword',
  ForgetPassword = 'ForgetPassword',
  VerificationCode = 'VerificationCode',
  NewPassword = 'NewPassword',
  Successful = 'Successful',
}

export interface AuthStep {
  step: AuthStepValueTypes;
  next?: AuthStepValueTypes;
  prev?: AuthStepValueTypes;
}

export const authSteps: Record<AuthStepValueTypes, AuthStep> = {
  [AuthStepValueTypes.Welcome]: {
    step: AuthStepValueTypes.Welcome,
  },
  [AuthStepValueTypes.Login]: {
    step: AuthStepValueTypes.Login,
    next: AuthStepValueTypes.RegisterInfo,
    prev: AuthStepValueTypes.Welcome,
  },
  [AuthStepValueTypes.RegisterInfo]: {
    step: AuthStepValueTypes.RegisterInfo,
    next: AuthStepValueTypes.RegisterPassword,
    prev: AuthStepValueTypes.Welcome,
  },
  [AuthStepValueTypes.RegisterPassword]: {
    step: AuthStepValueTypes.RegisterPassword,
    next: AuthStepValueTypes.Successful,
    prev: AuthStepValueTypes.RegisterInfo,
  },
  [AuthStepValueTypes.ForgetPassword]: {
    step: AuthStepValueTypes.ForgetPassword,
    next: AuthStepValueTypes.VerificationCode,
  },
  [AuthStepValueTypes.VerificationCode]: {
    step: AuthStepValueTypes.VerificationCode,
    next: AuthStepValueTypes.NewPassword,
  },
  [AuthStepValueTypes.NewPassword]: {
    step: AuthStepValueTypes.NewPassword,
    next: AuthStepValueTypes.Successful,
  },
  [AuthStepValueTypes.Successful]: {
    step: AuthStepValueTypes.Successful,
  },
};
