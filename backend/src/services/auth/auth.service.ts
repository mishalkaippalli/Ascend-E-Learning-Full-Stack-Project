import { IUserRepository } from "../../interfaces/repository/IUserRepository";

import {
  ISignupDTO,
  ISignupResponseDTO,
  IVerifyOtpDTO,
  IResendOtpDTO
} from "../../dtos/auth.dto";

import { IPasswordHasher } from "../../interfaces/service/auth/IPasswordHasher";
import { IAuthService } from "../../interfaces/service/auth/IAuthService";
import { ConflictError } from "../../errors/conflict.error";
import { BadRequestError } from "../../errors/bad-request.error";
import { NotFoundError } from "../../errors/not-found.error";
import { TooManyRequestsError } from "../../errors/too-many-requests.error";
import { UserRole } from "../../types/auth.types";
import { UserMapper } from "../../mappers/user.mapper";
import { IOtpService } from "../../interfaces/service/auth/IOtpService";
import { IEmailService } from "../../interfaces/service/auth/IEmailService";
import { OtpPurpose } from "../../types/auth.types";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly otpService: IOtpService,
    private readonly emailService: IEmailService,
) {}

  async signup(
    input: ISignupDTO,
  ): Promise<ISignupResponseDTO> {
    const normalizedEmail = input.email
      .trim()
      .toLowerCase();

    const existingUser =
      await this.userRepository.findByEmail(
        normalizedEmail,
      );

    if (existingUser) {
      throw new ConflictError(
        "An account with this email already exists",
      );
    }

    const hashedPassword =
      await this.passwordHasher.hash(
        input.password,
      );

    const user =
      await this.userRepository.create({
        name: input.name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: UserRole.STUDENT,
      });

    const otp =
      await this.otpService.generateAndStore(
        normalizedEmail,
        OtpPurpose.EMAIL_VERIFICATION,
      );

    await this.emailService.sendVerificationOtp(
      normalizedEmail,
      otp,
    );

    return UserMapper.toSignupResponse(user);
  }

  async verifyEmailOtp(
    input: IVerifyOtpDTO,
  ): Promise<void> {
    const normalizedEmail = input.email
      .trim()
      .toLowerCase();

    const user =
      await this.userRepository.findByEmail(
        normalizedEmail,
      );

    if (!user) {
      throw new NotFoundError(
        "User not found",
      );
    }

    const isValid =
      await this.otpService.verify(
        normalizedEmail,
        OtpPurpose.EMAIL_VERIFICATION,
        input.otp,
      );

    if (!isValid) {
      throw new BadRequestError(
        "Invalid or expired OTP",
      );
    }

    await this.userRepository.updateEmailVerification(
      user._id,
      true,
    );
  }

  async resendEmailOtp(
    input: IResendOtpDTO,
  ): Promise<void> {
    const normalizedEmail = input.email
      .trim()
      .toLowerCase();

    const user =
      await this.userRepository.findByEmail(
        normalizedEmail,
      );

    if (!user) {
      throw new NotFoundError(
        "User not found",
      );
    }

    if (user.emailVerified) {
      throw new BadRequestError(
        "Email is already verified",
      );
    }


    const otp =
      await this.otpService.generateAndStore(
        normalizedEmail,
        OtpPurpose.EMAIL_VERIFICATION,
      );

    await this.emailService.sendVerificationOtp(
      normalizedEmail,
      otp,
    );

    const cooldownAcquired =
      await this.otpService.acquireResendCooldown(
        normalizedEmail,
        OtpPurpose.EMAIL_VERIFICATION,
      );

    if (!cooldownAcquired) {
      throw new TooManyRequestsError(
        "Please wait before requesting another OTP",
      );
    }

  }
  
}