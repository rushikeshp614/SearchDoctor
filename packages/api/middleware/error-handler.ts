import { Context, Next } from 'koa';
import CustomError from '../errors/custom-error';
import { StatusCodes } from 'http-status-codes';


const errorHandlerMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    if (err instanceof CustomError) {
      ctx.status = err.statusCode;
      ctx.body = { msg: err.message };
    } else {
      ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = { err: 'Internal Server Error' };
    }
  }
};

export default errorHandlerMiddleware;