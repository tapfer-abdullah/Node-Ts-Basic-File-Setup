/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZodError } from 'zod';
import type { NextFunction, Request, Response } from 'express';

interface ZodIssue {
  path: string;
  message: string;
}

interface CustomError {
  status?: number;
  statusCode?: number;
  message?: string | { message?: string; error?: string };
  msg?: string;
}

interface ErrorResponse {
  success: boolean;
  message: string;
  issues?: ZodIssue[];
  error?: unknown;
}

const globalErrorHandler = (
  error: string | ZodError | CustomError | unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<ErrorResponse> => {
  console.error('Global Error Handler:', error);

  let statuscode: number = 500;
  let message: string = 'Something went wrong';

  // Handle string errors
  if (typeof error === 'string') {
    message = error;
  }

  // Handle Zod validation errors
  else if (error instanceof ZodError) {
    statuscode = 400; // Bad Request
    message = 'Data missing or invalid in required fields';

    const issues: ZodIssue[] = error.issues.map((err) => ({
      path: err.path?.join('.') || 'unknown_field',
      message: err.message,
    }));

    return res.status(statuscode).json({
      success: false,
      message,
      issues,
    });
  }

  // Handle other error objects
  else if (typeof error === 'object' && error !== null) {
    const customError = error as CustomError;
    statuscode = customError.status || customError.statusCode || 500;
    const errorMessage = customError.message;
    message =
      (typeof errorMessage === 'object' ? errorMessage?.message : undefined) ||
      (typeof errorMessage === 'object' ? errorMessage?.error : undefined) ||
      (typeof errorMessage === 'string' ? errorMessage : undefined) ||
      customError.msg ||
      message;
  }

  return res.status(statuscode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error : undefined,
  });
};

export default globalErrorHandler;
