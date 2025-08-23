import express from "express";
import {
  PostController,
  postDeleteController,
  postGetController,
  postPutController,
} from "../controller/postController.js";

const postRouter = express.Router();

postRouter.post("/", PostController);
postRouter.get("/", postGetController);
postRouter.put("/:id", postPutController);
postRouter.delete("/:id", postDeleteController);

export default postRouter;
