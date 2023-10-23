import express from "express";
import { getChats, getAChat } from "../controllers/chat.controller";
import isAuthenticated from "../middlewares/auth";

const router = express.Router();

router
  .get("/", isAuthenticated, getChats)
  .get("/:id", isAuthenticated, getAChat);

export default router;
