import {
  IPublisherSignupDTO,
  IPublisherSignupResponseDTO,
} from '../../dtos/publisher.dto';

import { IPublisherRepository } from '../../interfaces/repository/IPublisherRepository';
import { IUserRepository } from '../../interfaces/repository/IUserRepository';

import { IPasswordHasher } from '../../interfaces/service/auth/IPasswordHasher';
import { IOtpService } from '../../interfaces/service/auth/IOtpService';
import { IEmailService } from '../../interfaces/service/auth/IEmailService';

import { IPublisherService } from '../../interfaces/service/publisher/IPublisherService';
import { ConflictError } from '../../errors/conflict.error';
import { UserRole, OtpPurpose } from '../../types/auth.types';
import { PublisherMapper } from '../../mappers/publisher.mapper';

export class PublisherService implements IPublisherService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly publisherRepository: IPublisherRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly otpService: IOtpService,
    private readonly emailService: IEmailService,
  ) {}

  async signup(
    data: IPublisherSignupDTO,
  ): Promise<IPublisherSignupResponseDTO> {

    const normalizedEmail = data.email.trim().toLowerCase();

    const existingUser =
      await this.userRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new ConflictError(
        'An account with this email already exists',
      );
    }

    const hashedPassword =
      await this.passwordHasher.hash(data.password);

    const user = await this.userRepository.create({
      name: data.name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: UserRole.PUBLISHER,
    });

    const publisher = await this.publisherRepository.create({
      userId: user._id,
      publisherType: data.publisherType,
      ...(data.organizationName !== undefined && {
        organizationName: data.organizationName,
      }),
    });

    const otp = await this.otpService.generateAndStore(
      normalizedEmail,
      OtpPurpose.EMAIL_VERIFICATION,
    );

    await this.emailService.sendOtp(
      normalizedEmail,
      otp,
      OtpPurpose.EMAIL_VERIFICATION,
    );

    return PublisherMapper.toSignupResponse(user, publisher);
  }
}