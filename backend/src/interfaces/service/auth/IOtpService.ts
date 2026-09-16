import { OtpPurpose } from '../../../types/auth.types';

export interface IOtpService {
  generateAndStore(identifier: string, purpose: OtpPurpose): Promise<string>;

  verify(
    identifier: string,
    purpose: OtpPurpose,
    otp: string,
  ): Promise<boolean>;

  acquireResendCooldown(
    identifier: string,
    purpose: OtpPurpose,
  ): Promise<boolean>;
}
