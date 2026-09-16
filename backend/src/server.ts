import 'dotenv/config';

import app from './app';
import { connectDB } from './config/database';
import { connectRedis } from './config/redis';
import { logger } from './config/logger';

const PORT = process.env.PORT || 4000;

const startServer = async (): Promise<void> => {
  await connectDB();
  await connectRedis();

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();
