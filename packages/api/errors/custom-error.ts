import { StatusCodes } from 'http-status-codes';

class CustomError extends Error {
  constructor(message: string, public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = this.constructor.name;
  }
}

export default CustomError;