import { AuthController } from '../controllers/auth.controller';
import { IUserRepository } from '../interfaces/repository/IUserRepository';
import { Argon2PasswordHasher } from '../services/auth/argon2-password-hasher';
import { AuthService } from '../services/auth/auth.service';
import { UserRepository } from '../repositories/user.repository';
import { RedisOtpService } from '../services/auth/redis-otp.service';
import { NodemailerEmailService } from '../services/auth/nodemailer-email.service';
import { JwtTokenService } from '../services/auth/jwt-token.service';
import { RefreshSessionRepository } from '../repositories/refresh-session.repository';
import { Sha256RefreshTokenHasher } from '../services/auth/sha256-refresh-token-hasher';
import { RedisPasswordResetTokenService } from '../services/auth/redis-password-reset-token.service';
import { AuthenticateMiddleware } from '../middlewares/authenticate.middleware';

import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user/user.service'

const userRepository: IUserRepository = new UserRepository();
const userService = new UserService(userRepository)
const passwordHasher = new Argon2PasswordHasher();
const otpService = new RedisOtpService();
const emailService = new NodemailerEmailService();
const tokenService = new JwtTokenService();
const authenticateMiddleware = new AuthenticateMiddleware(tokenService);
const refreshSessionRepository = new RefreshSessionRepository();
const refreshTokenHasher = new Sha256RefreshTokenHasher();
const passwordResetTokenService = new RedisPasswordResetTokenService();

const authService = new AuthService(
  userRepository,
  passwordHasher,
  otpService,
  emailService,
  tokenService,
  refreshSessionRepository,
  refreshTokenHasher,
  passwordResetTokenService
);

export const authController = new AuthController(authService);

export const userController = new UserController(userService)

export { authenticateMiddleware };
