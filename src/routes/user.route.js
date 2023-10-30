import express from "express";
import { allUsers, me } from "../controllers/user.controller";
import isAuthenticated from "../middlewares/auth";

const router = express.Router();

router.get("/", isAuthenticated, allUsers).get("/me", isAuthenticated, me);
// .get("/:id", isAuthenticated, getAChat);

export default router;
