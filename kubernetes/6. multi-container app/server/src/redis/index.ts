import { createClient } from "redis";
import { redisConfig } from "../config/redis";

export const redisClient = createClient(redisConfig);
export const redisPub = redisClient.duplicate();

export async function initializeRedis() {
  await redisClient.connect();
  await redisPub.connect();
  redisClient.on("error", (error) => {
    console.log(error);
  });
  redisPub.on("error", (error) => {
    console.log(error);
  });
}
