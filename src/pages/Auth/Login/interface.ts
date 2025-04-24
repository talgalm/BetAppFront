export type LoginFormInput = {
  Email: string;
  Password: string;
};

export type RegisterFormInput = {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  passwordVerification: string;
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
