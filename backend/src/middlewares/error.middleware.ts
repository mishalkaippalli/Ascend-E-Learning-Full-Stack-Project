import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/app-error.js';
import { logger } from '../config/logger.js';

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    logger.warn(
      {
        statusCode: error.statusCode,
        error: error.message,
      },
      'Application error',
    );

    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  logger.error(error, 'Unhandled application error');

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};
