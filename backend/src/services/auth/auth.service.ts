import { IUserRepository } from "../../interfaces/repository/IUserRepository";

import {
  ISignupDTO,
  ISignupResponseDTO,
} from "../../dtos/auth.dto";

import { IPasswordHasher } from "../../interfaces/service/auth/IPasswordHasher";
import { IAuthService } from "../../interfaces/service/auth/IAuthService";
import { ConflictError } from "../../errors/conflict.error";
import { UserRole } from "../../types/auth.types";
import { UserMapper } from "../../mappers/user.mapper";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async signup(
    input: ISignupDTO,
  ): Promise<ISignupResponseDTO> {
    const normalizedEmail = input.email
      .trim()
      .toLowerCase();

    const existingUser =
      await this.userRepository.findByEmail(
        normalizedEmail,
      );

    if (existingUser) {
      throw new ConflictError(
        "An account with this email already exists",
      );
    }

    const hashedPassword =
      await this.passwordHasher.hash(
        input.password,
      );

    const user =
      await this.userRepository.create({
        name: input.name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: UserRole.STUDENT,
      });

    return UserMapper.toSignupResponse(user);
  }
}