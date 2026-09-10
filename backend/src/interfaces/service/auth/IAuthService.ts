import {
  ISignupDTO,
  ISignupResponseDTO,
  IVerifyOtpDTO,
} from "../../../dtos/auth.dto";

export interface IAuthService {
  signup(
    data: ISignupDTO,
  ): Promise<ISignupResponseDTO>;

  verifyEmailOtp(
    data: IVerifyOtpDTO,
  ): Promise<void>;
}