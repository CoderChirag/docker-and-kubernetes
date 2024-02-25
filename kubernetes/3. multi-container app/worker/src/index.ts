import "dotenv/config";
import { initializeRedis, redisClient, redisSub } from "./redis";

async function bootstrap() {
  await initializeRedis();
}

function fib(index: number): number {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

bootstrap().then(() => {
  console.log("Worker is running...");
  redisSub.subscribe("insert", (message, channel) => {
    const val = fib(parseInt(message));
    console.log(`Setting value for ${message} to ${val}`);
    redisClient.hSet("values", message, val);
  });
});
