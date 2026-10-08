import { Types } from 'mongoose';

import { IBaseRepository } from './IBaseRepository';

import { IPublisher } from '../../models/publisher/publisher.model';

import { PublisherType } from '../../types/publisher.types';

export interface CreatePublisherData {
  userId: Types.ObjectId;
  publisherType: PublisherType;
  organizationName?: string;
}

export type UpdatePublisherData = Partial<CreatePublisherData>;

export interface IPublisherRepository
  extends IBaseRepository<
    IPublisher,
    CreatePublisherData,
    UpdatePublisherData
  > {
  findByUserId(userId: Types.ObjectId): Promise<IPublisher | null>;
}