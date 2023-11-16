import { Request, Response, Router } from "express";

import AuthService from "../services/authService";

const router = Router();
const authService = new AuthService();

router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['Auth']

    const { email, password } = req.body;

    console.log("email", email);
    console.log("password", password);

    const result = await authService.login({ email, password });

    res.success({ message: "Login success", data: result });
  } catch (error) {
    res.error({
      error: error as Error,
      message: "Erro ao fazer login, tente novamente mais tarde!",
    });
  }
});

router.post("/auth/refresh-token", async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['Auth']

    const { refreshToken } = req.body;

    const result = await authService.refreshToken({ refreshToken });

    res.created({ message: "Refresh token with success", data: result });
  } catch (error) {
    res.error({
      error: error as Error,
      message: "Erro ao fazer login, tente novamente mais tarde!",
    });
  }
});

export default router;
