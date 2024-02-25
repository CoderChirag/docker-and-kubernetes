import "dotenv/config";
import express from "express";
import cors from "cors";
import { createTable, db } from "./db";
import apiRoutes from "./api/routes";
import { initializeRedis } from "./redis";

async function bootstrap() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/values", apiRoutes);

  await createTable();
  await initializeRedis();
  return app;
}

bootstrap().then((app) => {
  app.listen(5000, () => {
    console.log("Server listening on port 5000");
  });
});
