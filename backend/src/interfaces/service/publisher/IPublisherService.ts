import {
  IPublisherSignupDTO,
  IPublisherSignupResponseDTO,
} from '../../../dtos/publisher.dto';

export interface IPublisherService {
  signup(
    data: IPublisherSignupDTO
  ): Promise<IPublisherSignupResponseDTO>;
}