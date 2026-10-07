import { ISignupResponseDTO } from '../dtos/auth.dto';

import { UserDocument } from '../models/user/user.model';

export class UserMapper {
  static toSignupResponse(user: UserDocument): ISignupResponseDTO {                      //static means the method belongs to the class itself, rather than to an object/instance created from that class.
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
    };
  }
}
