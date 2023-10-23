const jwt = require("jsonwebtoken");
import { NextFunction } from "express";
const asyncHandler = require("express-async-handler");
import User from "../model/user-model";

const isAuthenticated = asyncHandler(
  async (req: any, res: any, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (error: any) {
        res.status(401);
        throw new Error("Not authorized");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authroized");
    }
  }
);
export default isAuthenticated;
