import {
  CreateRefreshSessionData,
  IRefreshSessionRepository,
} from '../interfaces/repository/IRefreshSessionRepository';

import { Types } from 'mongoose';

import {
  RefreshSession,
  RefreshSessionDocument,
} from '../models/auth/refresh-session.model';

export class RefreshSessionRepository implements IRefreshSessionRepository {
  async create(
    data: CreateRefreshSessionData,
  ): Promise<RefreshSessionDocument> {
    return RefreshSession.create(data);
  }

  async findByTokenId(tokenId: string): Promise<RefreshSessionDocument | null> {
    return RefreshSession.findOne({
      tokenId,
    });
  }

  async revokeByTokenId(
    tokenId: string,
  ): Promise<RefreshSessionDocument | null> {
    return RefreshSession.findOneAndUpdate(
      {
        tokenId,
        revokedAt: null,
      },
      {
        revokedAt: new Date(),
      },
      {
        new: true,
      },
    );
  }

   async revokeAllByUserId(
    userId: Types.ObjectId,
  ): Promise<void> {
    await RefreshSession.updateMany(
      {
        userId,
        revokedAt: null,
      },
      {
        revokedAt: new Date(),
      },
    );
  }
}
