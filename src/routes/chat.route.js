import express from "express";
import {
  accesChat,
  fetchChats,
  createRoom,
  renameRoom,
  addToRoom,
  removeFromRoom,
} from "../controllers/chat.controller";
import isAuthenticated from "../middlewares/auth";

const router = express.Router();

router
  .post("/", isAuthenticated, accesChat)
  .get("/", isAuthenticated, fetchChats)
  .post("/room", isAuthenticated, createRoom)
  .put("/rename", isAuthenticated, renameRoom)
  .put("/addtoroom", isAuthenticated, addToRoom)
  .put("/removefromroom", isAuthenticated, removeFromRoom);

export default router;
