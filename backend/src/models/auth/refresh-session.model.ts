import mongoose, {
  HydratedDocument,
  Schema,
  Types,
} from "mongoose";

export interface IRefreshSession {
  userId: Types.ObjectId;
  tokenId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type RefreshSessionDocument =
  HydratedDocument<IRefreshSession>;

const refreshSessionSchema =
  new Schema<IRefreshSession>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      tokenId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      tokenHash: {
        type: String,
        required: true,
      },

      expiresAt: {
        type: Date,
        required: true,
      },

      revokedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    },
  );

export const RefreshSession =
  mongoose.model<IRefreshSession>(
    "RefreshSession",
    refreshSessionSchema,
  );