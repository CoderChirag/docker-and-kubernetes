import type { Request, Response } from "express";
import { db, type Data } from "../db";
import { redisClient, redisPub } from "../redis";

export async function getAllValues(req: Request, res: Response) {
  try {
    const values = await db.select("*").from<Data>("data");
    return res.status(200).json({ success: true, data: values });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

export async function getCachedValues(req: Request, res: Response) {
  try {
    const values = await redisClient.hGetAll("values");
    return res.status(200).json({ success: true, data: values });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

export async function insertValue(req: Request, res: Response) {
  try {
    if (
      typeof req.body.index !== "number" &&
      !isNaN(parseInt(req.body.index))
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Index should be a number" });
    }
    const { index: value } = req.body as { index: number };

    if (value > 40) {
      return res.status(422).json({ success: false, error: "Index too high" });
    }

    await redisClient.hSet("values", value, "Nothing yet!");
    await redisPub.publish("insert", value.toString());

    const data = await db<Data>("data").insert({ value });
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(200).json({ success: true });
    }
    return res.status(500).json({ success: false, error: error.message });
  }
}
