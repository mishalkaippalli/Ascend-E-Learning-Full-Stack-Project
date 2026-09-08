import { AuthController } from "../controllers/auth.controller";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { Argon2PasswordHasher } from "../services/auth/argon2-password-hasher";
import { AuthService } from "../services/auth/auth.service";
import { UserRepository } from "../repositories/user.repository";

const userRepository: IUserRepository =
  new UserRepository();

const passwordHasher =
  new Argon2PasswordHasher();

const authService =
  new AuthService(
    userRepository,
    passwordHasher,
  );

export const authController =
  new AuthController(authService);