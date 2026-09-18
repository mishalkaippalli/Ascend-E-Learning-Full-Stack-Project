import { OtpPurpose } from "../../../types/auth.types";

export interface IEmailService {
  sendOtp(
    email: string,
    otp: string,
    purpose: OtpPurpose,
  ): Promise<void>;
}
