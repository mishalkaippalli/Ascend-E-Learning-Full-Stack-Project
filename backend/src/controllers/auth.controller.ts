import {
  NextFunction,
  Request,
  Response,
} from "express";

import { ISignupDTO } from "../dtos/auth.dto";
import { IAuthService } from "../interfaces/service/auth/IAuthService";

export class AuthController {
  constructor(
    private readonly authService: IAuthService,
  ) {}

  async signup(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const input: ISignupDTO = req.body;

      const user = await this.authService.signup(input);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}