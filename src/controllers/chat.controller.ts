import { Request, Response } from "express";

export const getChats = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
  });
};

export const getAChat = (req: Request, res: Response) => {
  return res.json({
    status: "ok",
  });
};
