import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { randomUUID } from "crypto";
import {
  ISignupDTO,
  ISignupResponseDTO,
  IVerifyOtpDTO,
  IResendOtpDTO,
  ILoginDTO,
  ILoginResponseDTO
} from "../../dtos/auth.dto";

import { IPasswordHasher } from "../../interfaces/service/auth/IPasswordHasher";
import { IAuthService } from "../../interfaces/service/auth/IAuthService";
import { ConflictError } from "../../errors/conflict.error";
import { BadRequestError } from "../../errors/bad-request.error";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { ForbiddenError } from "../../errors/forbidden.error";
import { NotFoundError } from "../../errors/not-found.error";
import { TooManyRequestsError } from "../../errors/too-many-requests.error";
import { UserRole, OtpPurpose, LoginResult } from "../../types/auth.types";
import { UserMapper } from "../../mappers/user.mapper";
import { IOtpService } from "../../interfaces/service/auth/IOtpService";
import { IEmailService } from "../../interfaces/service/auth/IEmailService";
import { ITokenService } from "../../interfaces/service/auth/ITokenService";
import { IRefreshTokenHasher } from "../../interfaces/service/auth/IRefreshTokenHasher";
import { IRefreshSessionRepository } from "../../interfaces/repository/IRefreshSessionRepository";
import { authConfig } from "../../config/auth.config";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly otpService: IOtpService,
    private readonly emailService: IEmailService,
    private readonly tokenService: ITokenService,
    private readonly refreshSessionRepository: IRefreshSessionRepository,
    private readonly refreshTokenHasher: IRefreshTokenHasher,
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

  async login(
    input: ILoginDTO,
  ): Promise<LoginResult> {
    const normalizedEmail =
      input.email.trim().toLowerCase();

    const user =
      await this.userRepository.findByEmail(
        normalizedEmail,
        true,
      );

    if (!user) {
      throw new UnauthorizedError(
        "Invalid email or password",
      );
    }

    if (!user.isActive) {
      throw new ForbiddenError(
        "Your account is currently deactivated",
      );
    }

    if (!user.emailVerified) {
      throw new ForbiddenError(
        "Please verify your email before logging in",
      );
    }

    const isPasswordValid =
      await this.passwordHasher.verify(
        user.password,
        input.password,
      );

    if (!isPasswordValid) {
      throw new UnauthorizedError(
        "Invalid email or password",
      );
    }

    const accessToken =
      this.tokenService.generateAccessToken({
        sub: user._id.toString(),
        role: user.role,
      });

    const tokenId = randomUUID();

    const refreshToken =
      this.tokenService.generateRefreshToken({
        sub: user._id.toString(),
        jti: tokenId,
      });

    const refreshTokenHash =
      this.refreshTokenHasher.hash(refreshToken);

    const expiresAt = new Date(
      Date.now() +
        authConfig.refreshToken.maxAge,
    );

    await this.refreshSessionRepository.create({
      userId: user._id,
      tokenId,
      tokenHash: refreshTokenHash,
      expiresAt,
    });

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
      },
      accessToken,
      refreshToken,
    };
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