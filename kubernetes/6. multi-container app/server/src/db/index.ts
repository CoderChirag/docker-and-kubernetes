import Knex from "knex";
import { dbConfig } from "../config/db";

export const db = Knex(dbConfig);

export interface Data {
  _id: number;
  value: number;
}

export async function createTable() {
  if (!(await db.schema.hasTable("data"))) {
    return db.schema.createTable("data", (table) => {
      table.increments("_id");
      table.integer("value").unique();
    });
  }
}
