import express from "express";
import { allUsers } from "../controllers/user.controller";
import isAuthenticated from "../middlewares/auth";

const router = express.Router();

router.get("/", isAuthenticated, allUsers);
// .get("/:id", isAuthenticated, getAChat);

export default router;
