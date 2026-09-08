import { ISignupDTO, ISignupResponseDTO } from "../../../dtos/auth.dto";

export interface IAuthService {
  signup(data: ISignupDTO): Promise<ISignupResponseDTO>;
}