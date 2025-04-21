export type LoginFormInput = {
  Email: string;
  Password: string;
};

export type RegisterFormInput = {
  Email: string;
  FullName: string;
  PhoneNumber: string;
  Password: string;
  PasswordVerification: string;
};

export type ForgotPasswordFormInput = {
  Email: string;
};

export type RegisterProviderFormInput = {
  PhoneNumber: string;
};

export type NewPasswordFormInput = {
  Password: string;
  PasswordVerification: string;
};
