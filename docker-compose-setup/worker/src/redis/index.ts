import { createClient } from "redis";
import { redisConfig } from "../config/redis";

export const redisClient = createClient(redisConfig);
export const redisSub = redisClient.duplicate();

export async function initializeRedis() {
  await redisClient.connect();
  await redisSub.connect();
  redisClient.on("error", (error) => {
    console.log(error);
  });
  redisSub.on("error", (error) => {
    console.log(error);
  });
}
