import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import http from "http";
import { connectDB } from "./config/data.js";
import rateLimit from "express-rate-limit";
import { Server } from "socket.io";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { ErrorMiddleware } from "./middleware/errorMiddleware.js";
import authRouter from "./router/authRouter.js";
import postRouter from "./router/postRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api", limiter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("newComment", (data) => {
    io.emit("commentAdded", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use(ErrorMiddleware);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
