import { IUserRepository } from '../../interfaces/repository/IUserRepository';
import { randomUUID } from 'crypto';
import {
  ISignupDTO,
  ISignupResponseDTO,
  IVerifyOtpDTO,
  IResendOtpDTO,
  ILoginDTO,
  IForgotPasswordDTO,
  IVerifyResetOtpDTO,
  IResetPasswordDTO
} from '../../dtos/auth.dto';
import { Types } from 'mongoose';
import { IPasswordHasher } from '../../interfaces/service/auth/IPasswordHasher';
import { IPasswordResetTokenService } from '../../interfaces/service/auth/IPasswordResetTokenService';
import { IAuthService } from '../../interfaces/service/auth/IAuthService';
import { ConflictError } from '../../errors/conflict.error';
import { BadRequestError } from '../../errors/bad-request.error';
import { UnauthorizedError } from '../../errors/unauthorized.error';
import { ForbiddenError } from '../../errors/forbidden.error';
import { NotFoundError } from '../../errors/not-found.error';
import { TooManyRequestsError } from '../../errors/too-many-requests.error';
import { UserRole, OtpPurpose, LoginResult, RefreshResult } from '../../types/auth.types';
import { UserMapper } from '../../mappers/user.mapper';
import { IOtpService } from '../../interfaces/service/auth/IOtpService';
import { IEmailService } from '../../interfaces/service/auth/IEmailService';
import { ITokenService } from '../../interfaces/service/auth/ITokenService';
import { IRefreshTokenHasher } from '../../interfaces/service/auth/IRefreshTokenHasher';
import { IRefreshSessionRepository } from '../../interfaces/repository/IRefreshSessionRepository';
import { authConfig } from '../../config/auth.config';

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly otpService: IOtpService,
    private readonly emailService: IEmailService,
    private readonly tokenService: ITokenService,
    private readonly refreshSessionRepository: IRefreshSessionRepository,
    private readonly refreshTokenHasher: IRefreshTokenHasher,
    private passwordResetTokenService: IPasswordResetTokenService,
  ) {}

  async signup(input: ISignupDTO): Promise<ISignupResponseDTO> {
    const normalizedEmail = input.email.trim().toLowerCase();

    const existingUser = await this.userRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new ConflictError('An account with this email already exists');
    }

    const hashedPassword = await this.passwordHasher.hash(input.password);

    const user = await this.userRepository.create({
      name: input.name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: UserRole.STUDENT,
    });

    const otp = await this.otpService.generateAndStore(
      normalizedEmail,
      OtpPurpose.EMAIL_VERIFICATION,
    );

    await this.emailService.sendOtp(normalizedEmail, otp, OtpPurpose.EMAIL_VERIFICATION);

    return UserMapper.toSignupResponse(user);
  }

  async verifyEmailOtp(input: IVerifyOtpDTO): Promise<void> {
    const normalizedEmail = input.email.trim().toLowerCase();

    const user = await this.userRepository.findByEmail(normalizedEmail);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isValid = await this.otpService.verify(
      normalizedEmail,
      OtpPurpose.EMAIL_VERIFICATION,
      input.otp,
    );

    if (!isValid) {
      throw new BadRequestError('Invalid or expired OTP');
    }

    await this.userRepository.updateEmailVerification(user._id, true);
  }

  async login(input: ILoginDTO): Promise<LoginResult> {
    const normalizedEmail = input.email.trim().toLowerCase();

    const user = await this.userRepository.findByEmail(normalizedEmail, true);

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.isActive) {
      throw new ForbiddenError('Your account is currently deactivated');
    }

    if (!user.emailVerified) {
      throw new ForbiddenError('Please verify your email before logging in');
    }

    const isPasswordValid = await this.passwordHasher.verify(
      user.password,
      input.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const accessToken = this.tokenService.generateAccessToken({
      sub: user._id.toString(),
      role: user.role,
    });

    const tokenId = randomUUID();

    const refreshToken = this.tokenService.generateRefreshToken({
      sub: user._id.toString(),
      jti: tokenId,
    });

    const refreshTokenHash = this.refreshTokenHasher.hash(refreshToken);

    const expiresAt = new Date(Date.now() + authConfig.refreshToken.maxAge);

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

  async resendEmailOtp(input: IResendOtpDTO): Promise<void> {
    const normalizedEmail = input.email.trim().toLowerCase();

    const user = await this.userRepository.findByEmail(normalizedEmail);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.emailVerified) {
      throw new BadRequestError('Email is already verified');
    }

    const otp = await this.otpService.generateAndStore(
      normalizedEmail,
      OtpPurpose.EMAIL_VERIFICATION,
    );

    await this.emailService.sendOtp(normalizedEmail, otp, OtpPurpose.EMAIL_VERIFICATION);

    const cooldownAcquired = await this.otpService.acquireResendCooldown(
      normalizedEmail,
      OtpPurpose.EMAIL_VERIFICATION,
    );

    if (!cooldownAcquired) {
      throw new TooManyRequestsError(
        'Please wait before requesting another OTP',
      );
    }
  }

  async refresh(refreshToken: string): Promise<RefreshResult> {
    const payload = this.tokenService.verifyRefreshToken(refreshToken);

    const session = await this.refreshSessionRepository.findByTokenId(
      payload.jti,
    );
    
    if (!session) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    if (session.revokedAt) {
      throw new UnauthorizedError('Refresh token has been revoked');
    }

    if (session.expiresAt <= new Date()) {
      throw new UnauthorizedError('Refresh token has expired');
    }
       
    if (!this.refreshTokenHasher.verify(refreshToken, session.tokenHash)) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const user = await this.userRepository.findById(
      new Types.ObjectId(payload.sub),
    );

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    const newTokenId = randomUUID();

    const newRefreshToken =
      this.tokenService.generateRefreshToken({
        sub: user._id.toString(),
        jti: newTokenId,
      });

    const newRefreshTokenHash =
       this.refreshTokenHasher.hash(newRefreshToken);

    await this.refreshSessionRepository.create({
        userId: user._id,
        tokenId: newTokenId,
        tokenHash: newRefreshTokenHash,
        expiresAt: new Date(
          Date.now() + authConfig.refreshToken.maxAge,
        ),
    });

    await this.refreshSessionRepository.revokeByTokenId(
      payload.jti,
    );

    const accessToken = this.tokenService.generateAccessToken({
      sub: user._id.toString(),
      role: user.role,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string): Promise<void> {
      try {
        const payload =
          this.tokenService.verifyRefreshToken(refreshToken);

        await this.refreshSessionRepository.revokeByTokenId(
          payload.jti,
        );
      } catch {
        // Ignore invalid or expired refresh tokens during logout.
      }
    }

  async forgotPassword(
    data: IForgotPasswordDTO,
  ): Promise<void> {
    const normalizedEmail = data.email.toLowerCase().trim();

    const user =
      await this.userRepository.findByEmail(normalizedEmail);

    if (!user) {
      return;
    }

    const otp = await this.otpService.generateAndStore(
      normalizedEmail,
      OtpPurpose.PASSWORD_RESET,
    );

    await this.emailService.sendOtp(
      normalizedEmail,
      otp,
      OtpPurpose.PASSWORD_RESET,
    );
  }

  async verifyResetOtp(
    data: IVerifyResetOtpDTO,
  ): Promise<string> {
    const normalizedEmail = data.email.toLowerCase().trim();

    const user =
      await this.userRepository.findByEmail(normalizedEmail);

    if (!user) {
      throw new UnauthorizedError('Invalid or expired OTP');
    }

    const isValid =
      await this.otpService.verify(
        normalizedEmail,
        OtpPurpose.PASSWORD_RESET,
        data.otp,
      );

    if (!isValid) {
      throw new UnauthorizedError('Invalid or expired OTP');
    }

    const resetToken =
      await this.passwordResetTokenService.generateAndStore(
        user._id.toString(),
      );

    return resetToken;
  }

  async resetPassword(data: IResetPasswordDTO): Promise<void> {
    const userId =
      await this.passwordResetTokenService.consume(
        data.resetToken,
      );

    const objectUserId = new Types.ObjectId(userId);

    const hashedPassword =
      await this.passwordHasher.hash(data.newPassword);

    const user =
      await this.userRepository.updatePassword(
        objectUserId,
        hashedPassword,
      );

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await this.refreshSessionRepository.revokeAllByUserId(
      objectUserId,
    );
  }
}
