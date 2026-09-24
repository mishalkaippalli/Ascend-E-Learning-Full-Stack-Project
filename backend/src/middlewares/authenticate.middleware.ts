import { Request, Response, NextFunction } from 'express';

import { UnauthorizedError } from '../errors/unauthorized.error';
import { ITokenService } from '../interfaces/service/auth/ITokenService';

export class AuthenticateMiddleware {
  constructor(private readonly tokenService: ITokenService) {}

  execute(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedError('Authentication required');
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedError('Invalid authorization header');
    }

    try {
      const payload = this.tokenService.verifyAccessToken(token);

      req.user = {
        id: payload.sub,
        role: payload.role,
      };

      next();
    } catch {
      throw new UnauthorizedError(
        'Invalid or expired access token',
      );
    }
  }
}