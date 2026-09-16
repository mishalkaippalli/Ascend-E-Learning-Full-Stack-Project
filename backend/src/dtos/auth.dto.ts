import { UserRole } from '../types/auth.types';

export interface ISignupDTO {
  name: string;
  email: string;
  password: string;
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface ISignupResponseDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
}

export interface ILoginResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    emailVerified: boolean;
  };
  accessToken: string;
}

export interface IVerifyOtpDTO {
  email: string;
  otp: string;
}

export interface IResendOtpDTO {
  email: string;
}
