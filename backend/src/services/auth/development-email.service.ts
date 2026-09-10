import { logger } from "../../config/logger";
import { IEmailService } from "../../interfaces/service/auth/IEmailService";

export class DevelopmentEmailService
  implements IEmailService
{
  async sendVerificationOtp(
    email: string,
    otp: string,
  ): Promise<void> {
    logger.info(
      { email, otp },
      "Development email: verification OTP",
    );
  }
}