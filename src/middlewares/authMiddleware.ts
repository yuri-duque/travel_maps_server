import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../enum";
import { verifyToken } from "../utils/jwt";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = auth(req, res);

    if (decoded?.roles.some((role: string) => role === Role.user)) {
      next();
      return;
    }

    res.status(401).send("Unauthorized");
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = auth(req, res);

    if (decoded?.roles.some((role: string) => role === Role.admin || role === Role.superAdmin)) {
      next();
      return;
    }

    res.status(401).send("Unauthorized");
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

export const authSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = auth(req, res);

    if (decoded?.roles.some((role: string) => role === Role.superAdmin)) {
      next();
      return;
    }

    res.status(401).send("Unauthorized");
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

function auth(req: Request, res: Response) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = verifyToken(token);
    (req as CustomRequest).token = {
      userId: decoded._id,
      email: decoded.email,
      name: decoded.name,
      roles: decoded.roles,
    };

    return decoded;
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
}
