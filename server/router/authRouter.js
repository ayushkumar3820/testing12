import express from "express";
import { loginController, profileController, SignController } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", SignController);
authRouter.post("/login", loginController);
authRouter.get("/profile",authMiddleware, profileController);

export default authRouter;
