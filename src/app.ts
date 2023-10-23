import express from "express";
import dotenv from "dotenv";
import http from "node:http";
import { Server, Socket } from "socket.io";
// import { DefaultEventsMap } from "socket.io/dist/typed-events";
import chatRouter from "./routes/chat.route";
import authRouter from "./routes/auth.route";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/error";

dotenv.config();

const app = express();
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "ineuron-support.vercel.app",
  },
});
app.use(
  cors({
    origin: "ineuron-support.vercel.app",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to iNeuron Support Endpoint",
  });
});

app.use("/api/chat", chatRouter);

app.use("/api/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

// const connectedUsers = new Map();

// io.on("connection", (socket) => {
//   socket.on("authenticate", (userId: string) => {
//     connectedUsers.set(userId, socket);
//   });
//   socket.on(
//     "private_message",
//     (data: { senderId: string; receiverId: string; message: string }) => {
//       const { senderId, receiverId, message } = data;

//       const senderSocket = connectedUsers.get(senderId);
//       console.log(senderSocket.id);
//       const receiverSocket = connectedUsers.get(receiverId);
//       if (senderSocket && receiverSocket) {
//         senderSocket.emit("new_message", { senderId, message });
//         receiverSocket.emit("new_message", { senderId, message });
//       }

//       socket.on("disconnect", () => {
//         const userId = getUserIdBySocket(socket);
//         connectedUsers.delete(userId);
//       });
//     }
//   );
// });

// function getUserIdBySocket(
//   socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
// ) {
//   for (const [userId, userSocket] of connectedUsers.entries()) {
//     if (userSocket === socket) {
//       return userId;
//     }
//   }
//   return null;
// }

export default httpServer;
