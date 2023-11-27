import type { RedisClientOptions } from "redis";

export const redisConfig: RedisClientOptions = {
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    reconnectStrategy: 1000,
    tls: false,
  },
  // password: process.env.REDIS_PASSWORD,
};
