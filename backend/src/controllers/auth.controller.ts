import { NextFunction, Request, Response } from 'express';

import {
  ISignupDTO,
  IVerifyOtpDTO,
  IResendOtpDTO,
  ILoginDTO,
} from '../dtos/auth.dto';

import { IAuthService } from '../interfaces/service/auth/IAuthService';
import { authConfig } from '../config/auth.config';
import { UnauthorizedError } from '../errors/unauthorized.error';

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: ISignupDTO = req.body;

      const user = await this.authService.signup(input);

      res.status(201).json({
        success: true,
        data: user,
      });
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

      res.status(200).json({
        success: true,
        message: 'Email verified successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async resendEmailOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const otpData: IResendOtpDTO = req.body;

      await this.authService.resendEmailOtp(otpData);

      res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
      });
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

      res.status(200).json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
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

      const accessToken = await this.authService.refresh(refreshToken);

      res.status(200).json({
        success: true,
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
