import { STATUS } from "../middlewares/customErrorMiddleware";

class CustomError extends Error {
  statusCode: STATUS;

  constructor(message: string, statusCode = 400) {
    super(message);

    this.statusCode = statusCode;

    Object.setPrototypeOf(this, CustomError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors() {
    // Adapte essa função conforme necessário para incluir detalhes adicionais no objeto de resposta
    return {
      status: "error",
      message: this.message,
    };
  }
}

export default CustomError;
