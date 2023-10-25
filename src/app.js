const express = require("express");
import dotenv from "dotenv";
import http from "node:http";
import { Server, Socket } from "socket.io";
// @ts-ignore
import chatRouter from "./routes/chat.route";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

import cors from "cors";
import { notFound, errorHandler } from "./middlewares/error";

dotenv.config();

const app = express();
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to iNeuron Support Endpoint",
  });
});

app.use("/api/chat", chatRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(notFound);
app.use(errorHandler);

export default httpServer;
