import { Types } from "mongoose";

import {
  CreateUserData,
  IUserRepository,
  UpdateUserData,
} from "../interfaces/repository/IUserRepository";

import { IUser, User } from "../models/user/user.model";

import { BaseRepository } from "./base.repository";

export class UserRepository
  extends BaseRepository<
    IUser,
    CreateUserData,
    UpdateUserData
  >
  implements IUserRepository
{
  constructor() {
    super(User);
  }

  async findByEmail(
    email: string,
    includePassword = false,
  ) {
    const query = this.model.findOne({ email });

    if (includePassword) {
      query.select("+password");
    }

    return query.exec();
  }

  async updateEmailVerification(
    userId: Types.ObjectId,
    emailVerified: boolean,
  ) {
    return this.model
      .findByIdAndUpdate(
        userId,
        { emailVerified },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();
  }

  async updatePassword(
    userId: Types.ObjectId,
    password: string,
  ) {
    return this.model
      .findByIdAndUpdate(
        userId,
        { password },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();
  }

  async updateAccountStatus(
    userId: Types.ObjectId,
    isActive: boolean,
    deactivatedAt: Date | null = null,
  ) {
    return this.model
      .findByIdAndUpdate(
        userId,
        {
          isActive,
          deactivatedAt,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();
  }
}