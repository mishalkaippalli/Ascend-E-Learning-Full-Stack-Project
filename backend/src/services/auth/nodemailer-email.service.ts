import { emailTransporter } from "../../config/email";
import { IEmailService } from "../../interfaces/service/auth/IEmailService";

export class NodemailerEmailService
  implements IEmailService
{
  async sendVerificationOtp(
    email: string,
    otp: string,
  ): Promise<void> {
    await emailTransporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Verify your Ascend account",
      text: `Your Ascend verification OTP is ${otp}. This OTP expires in 5 minutes.`,
      html: `
        <h2>Verify your Ascend account</h2>
        <p>Your verification OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
        <p>If you did not create an Ascend account, you can ignore this email.</p>
      `,
    });
  }
}