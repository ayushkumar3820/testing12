import express from "express";
import {
  PostController,
  postDeleteController,
  postGetController,
  postGetById,
  postPutController,
} from "../controller/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const postRouter = express.Router();

postRouter.post("/",authMiddleware, PostController);
postRouter.get("/", postGetController);
postRouter.get("/:id", postGetById);
postRouter.put("/:id", postPutController);
postRouter.delete("/:id", postDeleteController);

export default postRouter;
