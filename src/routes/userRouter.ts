import { Request, RequestHandler, Response, Router } from "express";

import { authAdmin } from "../middlewares/authMiddleware";
import UserService from "../services/userService";

const router = Router();
const userService = new UserService();

router.post("/user", (async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['User']

    const { email, password, confirmPassword, name } = req.body;

    await userService.create({ email, password, confirmPassword, name });

    res.success({ message: "User created successfully" });
  } catch (error) {
    res.error({ error: error as Error, message: "Error to create users" });
  }
}) as RequestHandler);

router.post("/user/admin", authAdmin, (async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['User']

    const { email, password, confirmPassword, name, roles } = req.body;

    await userService.create({ email, password, confirmPassword, name, roles });

    res.success({ message: "User created successfully" });
  } catch (error) {
    res.error({ error: error as Error, message: "Error to create user admin" });
  }
}) as RequestHandler);

export default router;
