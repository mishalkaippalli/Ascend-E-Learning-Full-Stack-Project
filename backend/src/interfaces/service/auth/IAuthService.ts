import {
  ISignupDTO,
  ISignupResponseDTO,
  IVerifyOtpDTO,
  IResendOtpDTO,
  ILoginDTO,
  IForgotPasswordDTO,
  IVerifyResetOtpDTO,
  IResetPasswordDTO
} from '../../../dtos/auth.dto';

import { LoginResult, RefreshResult } from '../../../types/auth.types';

export interface IAuthService {
  signup(data: ISignupDTO): Promise<ISignupResponseDTO>;

  verifyEmailOtp(data: IVerifyOtpDTO): Promise<void>;

  resendEmailOtp(data: IResendOtpDTO): Promise<void>;

  login(data: ILoginDTO): Promise<LoginResult>;

  refresh(refreshToken: string): Promise<RefreshResult>;

  logout(refreshToken: string): Promise<void>;

  forgotPassword(data: IForgotPasswordDTO): Promise<void>;

  verifyResetOtp(data: IVerifyResetOtpDTO): Promise<string>;

  resetPassword(data: IResetPasswordDTO): Promise<void>;
}
