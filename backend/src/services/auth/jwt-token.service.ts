import jwt from 'jsonwebtoken';

import { authConfig } from '../../config/auth.config';
import { ITokenService } from '../../interfaces/service/auth/ITokenService';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '../../types/auth.types';

export class JwtTokenService implements ITokenService {
  generateAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, authConfig.accessToken.secret, {
      expiresIn: authConfig.accessToken.expiresIn,
    });
  }

  generateRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, authConfig.refreshToken.secret, {
      expiresIn: authConfig.refreshToken.expiresIn,
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return jwt.verify(
      token,
      authConfig.accessToken.secret,
    ) as AccessTokenPayload;
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    return jwt.verify(
      token,
      authConfig.refreshToken.secret,
    ) as RefreshTokenPayload;
  }
}
