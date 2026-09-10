
import { UserRole } from "../types/auth.types";

export interface ISignupDTO {
  name: string;
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

export interface IVerifyOtpDTO {
  email: string;
  otp: string;
}