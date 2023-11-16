import { STATUS } from "../middlewares/customErrorMiddleware";

class CustomError extends Error {
  statusCode: STATUS;

  constructor(message: string, statusCode = 400) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.statusCode = statusCode;
  }
}

export default CustomError;
