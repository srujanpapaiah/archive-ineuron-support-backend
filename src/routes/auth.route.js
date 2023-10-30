import express from "express";
import { signup, login, me } from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", signup).post("/login", login);

export default router;
