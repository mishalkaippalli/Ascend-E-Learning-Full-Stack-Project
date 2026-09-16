import { Types } from 'mongoose';

import { IUser, UserDocument } from '../../models/user/user.model';

import { UserRole } from '../../types/auth.types';

import { IBaseRepository } from './IBaseRepository';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserData {
  name?: string;
  email?: string;

  profilepic?: {
    publicId: string;
    url: string;
  };

  role?: UserRole;
  emailVerified?: boolean;
  isActive?: boolean;
  deactivatedAt?: Date | null;
}

export interface IUserRepository extends IBaseRepository<
  IUser,
  CreateUserData,
  UpdateUserData
> {
  findByEmail(
    email: string,
    includePassword?: boolean,
  ): Promise<UserDocument | null>;

  updateEmailVerification(
    userId: Types.ObjectId,
    emailVerified: boolean,
  ): Promise<UserDocument | null>;

  updatePassword(
    userId: Types.ObjectId,
    password: string,
  ): Promise<UserDocument | null>;

  updateAccountStatus(
    userId: Types.ObjectId,
    isActive: boolean,
    deactivatedAt?: Date | null,
  ): Promise<UserDocument | null>;
}
