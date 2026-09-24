import { Request, Response } from 'express';

import { UnauthorizedError } from '../errors/unauthorized.error';
import { IUserService } from '../interfaces/service/user/IUserService';

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

    res.status(200).json({
      success: true,
      data: user,
    });
  }
}