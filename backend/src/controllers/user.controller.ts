import { Request, Response } from 'express';

import { UnauthorizedError } from '../errors/unauthorized.error';
import { IUserService } from '../interfaces/service/user/IUserService';
import { ISignupResponseDTO } from '../dtos/auth.dto';
import { ApiSuccessResponse } from '../types/api.types';

export class UserController {
  constructor(
    private readonly userService: IUserService,
  ) {}

  async getCurrentUser(
    req: Request,
    res: Response,
  ): Promise<void> {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    const user = await this.userService.getCurrentUser(req.user.id);

    const response: ApiSuccessResponse<ISignupResponseDTO> = {
      success: true,
      data: user,
    };

    res.status(200).json(response);
    }
}