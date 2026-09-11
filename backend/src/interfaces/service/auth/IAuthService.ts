import {
  ISignupDTO,
  ISignupResponseDTO,
  IVerifyOtpDTO,
  IResendOtpDTO
} from "../../../dtos/auth.dto";

export interface IAuthService {
  signup(
    data: ISignupDTO,
  ): Promise<ISignupResponseDTO>;

  verifyEmailOtp(
    data: IVerifyOtpDTO,
  ): Promise<void>;

  resendEmailOtp(
    data: IResendOtpDTO,
  ): Promise<void>;
}