import "dotenv/config";

import app from "./app";
import { connectDB } from "./config/database";
import { logger } from "./config/logger";

const PORT = process.env.PORT || 4000;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();