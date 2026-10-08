import { IPublisherSignupResponseDTO } from '../dtos/publisher.dto';

import { UserDocument } from '../models/user/user.model';
import { PublisherDocument } from '../models/publisher/publisher.model';

export class PublisherMapper {
  static toSignupResponse(
    user: UserDocument,
    publisher: PublisherDocument,
  ): IPublisherSignupResponseDTO {
    return {
      userId: user._id.toString(),
      publisherId: publisher._id.toString(),
      name: user.name,
      email: user.email,
      publisherType: publisher.publisherType,
      ...(publisher.organizationName !== undefined && {
        organizationName: publisher.organizationName,
      }),
      verificationStatus: publisher.verification.status,
      emailVerified: user.emailVerified,
    };
  }
}