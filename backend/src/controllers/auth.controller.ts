import { NextFunction, Request, Response } from 'express';

import {
  ISignupDTO,
  ISignupResponseDTO,
  ILoginResponseDTO,
  IVerifyOtpDTO,
  IResendOtpDTO,
  ILoginDTO,
  IForgotPasswordDTO,
  IVerifyResetOtpDTO,
  IResetPasswordDTO,
  IVerifyResetOtpResponseDTO,
  IRefreshResponseDTO
} from '../dtos/auth.dto';

import { IAuthService } from '../interfaces/service/auth/IAuthService';
import { authConfig } from '../config/auth.config';
import { UnauthorizedError } from '../errors/unauthorized.error';

import { ApiSuccessResponse } from '../types/api.types';

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: ISignupDTO = req.body;

      const user = await this.authService.signup(input);

      const response: ApiSuccessResponse<ISignupResponseDTO> = {
        success: true,
        data: user,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async verifyEmailOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const otpData: IVerifyOtpDTO = req.body;

      await this.authService.verifyEmailOtp(otpData);

      const response: ApiSuccessResponse = {
        success: true,
        message: 'Email verified successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }


  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const otpData: IResendOtpDTO = req.body;

      await this.authService.resendOtp(otpData);

      const response: ApiSuccessResponse = {
        success: true,
        message: 'OTP sent successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: ILoginDTO = req.body;

      const result = await this.authService.login(input);

      res.cookie(
        'refreshToken',
        result.refreshToken,
        authConfig.refreshTokenCookie,
      );

      const response: ApiSuccessResponse<ILoginResponseDTO> = {
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new UnauthorizedError('Refresh token is required');
      }

      const result = await this.authService.refresh(refreshToken);

    res.cookie(
      'refreshToken',
      result.refreshToken,
      authConfig.refreshTokenCookie,
    );

    const response: ApiSuccessResponse<IRefreshResponseDTO> = {
      success: true,
      data: {
        accessToken: result.accessToken,
      },
    };

    res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        await this.authService.logout(refreshToken);
      }

      res.clearCookie('refreshToken', authConfig.refreshTokenCookie);  //  Clear client-side cookie by passing original matching flags (path/domain/security) // Express internally overrides maxAge with a past date (1970) to force browser deletion

      const response: ApiSuccessResponse = {
        success: true,
        message: 'Logged out successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const input: IForgotPasswordDTO = req.body;

      await this.authService.forgotPassword(input);

      const response: ApiSuccessResponse = {
        success: true,
        message:
          'If an account exists with this email, a password reset OTP has been sent.',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async verifyResetOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const input: IVerifyResetOtpDTO = req.body;

      const resetToken =
        await this.authService.verifyResetOtp(input);

      const response: ApiSuccessResponse<IVerifyResetOtpResponseDTO> = {
        success: true,
        data: {
          resetToken,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const input: IResetPasswordDTO = req.body;

      await this.authService.resetPassword(input);

      const response: ApiSuccessResponse = {
        success: true,
        message: 'Password reset successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
