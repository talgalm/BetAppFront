export enum AuthStepValueTypes {
  Welcome = 'Welcome',
  Login = 'Login',
  RegisterInfo = 'RegisterInfo',
  RegisterPassword = 'RegisterPassword',
  RegisterProvider = 'RegisterProvider',
  ForgetPassword = 'ForgetPassword',
  VerificationCode = 'VerificationCode',
  NewPassword = 'NewPassword',
  SuccessfulChangePassword = 'SuccessfulChangePassword',
  SuccessfulRegister = 'SuccessfulRegister',
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
    next: AuthStepValueTypes.SuccessfulRegister,
    prev: AuthStepValueTypes.RegisterInfo,
  },
  [AuthStepValueTypes.RegisterProvider]: {
    step: AuthStepValueTypes.RegisterProvider,
    next: AuthStepValueTypes.SuccessfulRegister,
    prev: AuthStepValueTypes.Login,
  },
  [AuthStepValueTypes.ForgetPassword]: {
    step: AuthStepValueTypes.ForgetPassword,
    next: AuthStepValueTypes.VerificationCode,
    prev: AuthStepValueTypes.Login,
  },
  [AuthStepValueTypes.VerificationCode]: {
    step: AuthStepValueTypes.VerificationCode,
    next: AuthStepValueTypes.NewPassword,
    prev: AuthStepValueTypes.ForgetPassword,
  },
  [AuthStepValueTypes.NewPassword]: {
    step: AuthStepValueTypes.NewPassword,
    next: AuthStepValueTypes.SuccessfulChangePassword,
    prev: AuthStepValueTypes.VerificationCode,
  },
  [AuthStepValueTypes.SuccessfulChangePassword]: {
    step: AuthStepValueTypes.SuccessfulChangePassword,
    next: AuthStepValueTypes.Login,
  },
  [AuthStepValueTypes.SuccessfulRegister]: {
    step: AuthStepValueTypes.SuccessfulRegister,
    next: AuthStepValueTypes.Login,
  },
};
