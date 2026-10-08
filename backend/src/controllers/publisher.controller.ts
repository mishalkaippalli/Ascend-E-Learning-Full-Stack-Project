import { NextFunction, Request, Response } from 'express';

import {
  IPublisherSignupDTO,
  IPublisherSignupResponseDTO,
} from '../dtos/publisher.dto';

import { IPublisherService } from '../interfaces/service/publisher/IPublisherService';

import { ApiSuccessResponse } from '../types/api.types';

export class PublisherController {
  constructor(
    private readonly publisherService: IPublisherService,
  ) {}

  async signup(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const input: IPublisherSignupDTO = req.body;

      const publisher =
        await this.publisherService.signup(input);

      const response: ApiSuccessResponse<IPublisherSignupResponseDTO> = {
        success: true,
        data: publisher,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}