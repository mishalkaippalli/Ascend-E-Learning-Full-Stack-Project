import type { StringValue } from "ms";
import ms from "ms";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessTokenSecret) {
  throw new Error("ACCESS_TOKEN_SECRET is not defined");
}

if (!refreshTokenSecret) {
  throw new Error("REFRESH_TOKEN_SECRET is not defined");
}

const accessTokenExpiresIn =
  (process.env.ACCESS_TOKEN_EXPIRES_IN || "15m") as StringValue;

const refreshTokenExpiresIn =
  (process.env.REFRESH_TOKEN_EXPIRES_IN || "7d") as StringValue;

const refreshTokenMaxAge = ms(refreshTokenExpiresIn);

export const authConfig = {
  accessToken: {
    secret: accessTokenSecret,
    expiresIn: accessTokenExpiresIn,
  },

  refreshToken: {
    secret: refreshTokenSecret,
    expiresIn: refreshTokenExpiresIn,
    maxAge: refreshTokenMaxAge,
  },

  refreshTokenCookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: refreshTokenMaxAge,
  },
};