// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ENV from "../config/ENV.js";

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: number; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
};
