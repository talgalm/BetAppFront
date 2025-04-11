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
