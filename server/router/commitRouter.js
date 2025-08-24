import express from "express";
import { commitGet, commitPost } from "../controller/commitController.js";

const commitRouter = express.Router();

commitRouter.post("/", commitPost);
commitRouter.get("/", commitGet);

export default commitRouter;
