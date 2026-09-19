import { Types } from 'mongoose';

import { RefreshSessionDocument } from '../../models/auth/refresh-session.model';

export interface CreateRefreshSessionData {
  userId: Types.ObjectId;
  tokenId: string;
  tokenHash: string;
  expiresAt: Date;
}

export interface IRefreshSessionRepository {
  create(data: CreateRefreshSessionData): Promise<RefreshSessionDocument>;

  findByTokenId(tokenId: string): Promise<RefreshSessionDocument | null>;

  revokeByTokenId(tokenId: string): Promise<RefreshSessionDocument | null>;

  revokeAllByUserId(userId: Types.ObjectId): Promise<void>;
}
