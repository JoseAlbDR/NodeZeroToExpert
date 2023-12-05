import { NextFunction, Request, Response } from 'express';
import { Status } from '../config/plugins/statusCodes';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export class ErrorHandler {
  public static middleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // console.log(err);

    let msg, statusCode;

    if (err instanceof PrismaClientValidationError) {
      statusCode = Status.BAD_REQUEST;
      msg = err.message.split('\n').at(-1);
    }

    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      statusCode = Status.NOT_FOUND;
      msg = err.meta?.cause;
    }

    return res.status(statusCode || Status.INTERNAL_SERVER_ERROR).json({
      name: err.name,
      msg: msg || err.message || 'Internal Server Error. Try Again Later',
      stack: err?.stack,
    });
  };
}
