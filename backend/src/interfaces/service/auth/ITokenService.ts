import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '../../../types/auth.types';

export interface ITokenService {
  generateAccessToken(payload: AccessTokenPayload): string;

  generateRefreshToken(payload: RefreshTokenPayload): string;

  verifyAccessToken(token: string): AccessTokenPayload;

  verifyRefreshToken(token: string): RefreshTokenPayload;
}
