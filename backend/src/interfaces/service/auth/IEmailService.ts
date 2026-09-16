export interface IEmailService {
  sendVerificationOtp(email: string, otp: string): Promise<void>;
}
