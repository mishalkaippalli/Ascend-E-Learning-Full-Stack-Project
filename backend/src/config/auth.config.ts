export const authConfig = {
  otp: {
    length: 6,
    expirationMinutes: 5,
    maxVerificationAttempts: 5,
    resendCooldownSeconds: 60,
  },
} as const;