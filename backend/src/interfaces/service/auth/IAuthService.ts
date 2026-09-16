import {
  ISignupDTO,
  ISignupResponseDTO,
  IVerifyOtpDTO,
  IResendOtpDTO,
  ILoginDTO,
} from '../../../dtos/auth.dto';

import { LoginResult } from '../../../types/auth.types';

export interface IAuthService {
  signup(data: ISignupDTO): Promise<ISignupResponseDTO>;

  verifyEmailOtp(data: IVerifyOtpDTO): Promise<void>;

  resendEmailOtp(data: IResendOtpDTO): Promise<void>;

  login(data: ILoginDTO): Promise<LoginResult>;

  refresh(refreshToken: string): Promise<string>;
}
