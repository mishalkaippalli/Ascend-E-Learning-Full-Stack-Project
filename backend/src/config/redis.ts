import { createClient } from "redis";

import { logger } from "./logger";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is not defined");
}

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on("error", (error) => {
  logger.error(error, "Redis client error");
});

export const connectRedis = async (): Promise<void> => {
  await redisClient.connect();

  logger.info("Redis connected successfully");
};

export { redisClient };