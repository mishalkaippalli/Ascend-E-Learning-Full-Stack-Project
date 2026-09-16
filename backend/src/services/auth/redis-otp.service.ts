import { randomInt } from 'crypto';

import { redisClient } from '../../config/redis';
import { IOtpService } from '../../interfaces/service/auth/IOtpService';
import { OtpPurpose } from '../../types/auth.types';

export class RedisOtpService implements IOtpService {
  private readonly otpExpirationSeconds = 300;
  private readonly resendCooldownSeconds = 60;

  private getKey(identifier: string, purpose: OtpPurpose): string {
    return `otp:${purpose}:${identifier}`;
  }

  private getCooldownKey(identifier: string, purpose: OtpPurpose): string {
    return `otp:cooldown:${purpose}:${identifier}`;
  }

  async generateAndStore(
    identifier: string,
    purpose: OtpPurpose,
  ): Promise<string> {
    const otp = randomInt(100000, 1000000).toString();

    const key = this.getKey(identifier, purpose);

    await redisClient.set(key, otp, {
      EX: this.otpExpirationSeconds,
    });
    return otp;
  }

  async verify(
    identifier: string,
    purpose: OtpPurpose,
    otp: string,
  ): Promise<boolean> {
    const key = this.getKey(identifier, purpose);

    const storedOtp = await redisClient.get(key);

    if (!storedOtp) {
      return false;
    }

    if (storedOtp !== otp) {
      return false;
    }

    await redisClient.del(key);

    return true;
  }

  async acquireResendCooldown(
    identifier: string,
    purpose: OtpPurpose,
  ): Promise<boolean> {
    const key = this.getCooldownKey(identifier, purpose);

    const result = await redisClient.set(key, '1', {
      EX: this.resendCooldownSeconds,
      NX: true,
    });

    return result === 'OK';
  }
}
