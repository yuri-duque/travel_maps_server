import { Request, Response, Router } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../swagger/swagger_output.json";

const router = Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

router.get("/api/health", async (req: Request, res: Response) => {
  // #swagger.tags = ['Default']

  res.success({ message: "OK" });
});

export default router;
