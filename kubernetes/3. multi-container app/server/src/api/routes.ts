import express from "express";
import { getAllValues, getCachedValues, insertValue } from "./controller";

const apiRoutes = express.Router();
apiRoutes.get("/all", getAllValues);

apiRoutes.get("/cached", getCachedValues);

apiRoutes.post("/", insertValue);

export default apiRoutes;
