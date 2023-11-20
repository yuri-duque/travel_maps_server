import { Request } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";

export function getUserIdFromToken(req: Request) {
  return (req as CustomRequest).user.user_id;
}
