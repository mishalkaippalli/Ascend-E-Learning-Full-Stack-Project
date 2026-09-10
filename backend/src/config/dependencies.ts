import { AuthController } from "../controllers/auth.controller";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { Argon2PasswordHasher } from "../services/auth/argon2-password-hasher";
import { AuthService } from "../services/auth/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { RedisOtpService } from "../services/auth/redis-otp.service";
import { DevelopmentEmailService } from "../services/auth/development-email.service";

const userRepository: IUserRepository =
  new UserRepository();

const passwordHasher =
  new Argon2PasswordHasher();

const otpService = new RedisOtpService();

const emailService = new DevelopmentEmailService();

const authService =
  new AuthService(
    userRepository,
    passwordHasher,
    otpService,
    emailService
  );

export const authController =
  new AuthController(authService);