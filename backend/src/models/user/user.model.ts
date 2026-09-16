import mongoose, { HydratedDocument, Schema } from 'mongoose';

import { UserRole } from '../../types/auth.types';

export interface IUser {
  name: string;
  email: string;
  password: string;

  profilepic?: {
    publicId: string;
    url: string;
  };

  role: UserRole;

  emailVerified: boolean;
  isActive: boolean;
  deactivatedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    profilepic: {
      publicId: {
        type: String,
      },

      url: {
        type: String,
      },
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },

    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    deactivatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>('User', userSchema);
// import mongoose, { Schema, model , Document} from "mongoose";
// import { UserRole } from "../../types/auth.types";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;

//   profilepic?: {
//     publicId: string;
//     url: string;
//   };

//   role: UserRole;

//   emailVerified: boolean;
//   isActive: boolean;
//   deactivatedAt: Date | null;

//   createdAt: Date;
//   updatedAt: Date;
// }

// // export type UserDocument = HydratedDocument<IUser>;                        //A Hydrated Document is a raw data object combined with all built-in Mongoose methods (.save(), .populate(), .isModified(), etc.).

// const userSchema = new Schema<IUser>(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,

//     },

//     password: {
//       type: String,
//       required: true,
//       select: false,
//     },

//     profilepic: {
//       publicId: {
//         type: String,
//       },

//       url: {
//         type: String,
//       },
//     },

//     role: {
//       type: String,
//       enum: Object.values(UserRole),
//       required: true,
//     },

//     emailVerified: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },

//     isActive: {
//       type: Boolean,
//       required: true,
//       default: true,
//     },

//     deactivatedAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// export const User = mongoose.model<IUser>("User", userSchema);
