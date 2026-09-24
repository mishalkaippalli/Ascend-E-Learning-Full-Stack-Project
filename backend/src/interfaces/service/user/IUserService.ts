import { ISignupResponseDTO } from '../../../dtos/auth.dto'

export interface IUserService {
  getCurrentUser(userId: string): Promise<ISignupResponseDTO>
}