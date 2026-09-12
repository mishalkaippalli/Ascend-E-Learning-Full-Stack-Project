import { AuthController } from "../controllers/auth.controller";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { Argon2PasswordHasher } from "../services/auth/argon2-password-hasher";
import { AuthService } from "../services/auth/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { RedisOtpService } from "../services/auth/redis-otp.service";
import { NodemailerEmailService } from "../services/auth/nodemailer-email.service";
import { JwtTokenService } from "../services/auth/jwt-token.service";
import { RefreshSessionRepository } from "../repositories/refresh-session.repository";
import { Sha256RefreshTokenHasher } from "../services/auth/sha256-refresh-token-hasher";

const userRepository: IUserRepository = new UserRepository();
const passwordHasher = new Argon2PasswordHasher();
const otpService = new RedisOtpService();
const emailService = new NodemailerEmailService();
const tokenService = new JwtTokenService();
const refreshSessionRepository = new RefreshSessionRepository();
const refreshTokenHasher = new Sha256RefreshTokenHasher();

const authService =
  new AuthService(
    userRepository,
    passwordHasher,
    otpService,
    emailService,
    tokenService,
    refreshSessionRepository,
    refreshTokenHasher,
  );

export const authController =
  new AuthController(authService);