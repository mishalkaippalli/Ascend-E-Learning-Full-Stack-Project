import { createHash } from 'crypto';

import { IRefreshTokenHasher } from '../../interfaces/service/auth/IRefreshTokenHasher';

export class Sha256RefreshTokenHasher implements IRefreshTokenHasher {
  hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  verify(token: string, hashedToken: string): boolean {
    return this.hash(token) === hashedToken;
  }
}
