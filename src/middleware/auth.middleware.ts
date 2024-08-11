import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  dotenv.config();
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.sendStatus(401);

  if (token !== process.env.API_TOKEN) {
    return res.sendStatus(403);
  }

  next();
};
