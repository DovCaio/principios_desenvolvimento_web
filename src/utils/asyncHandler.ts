import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface AsyncMiddleware {
    (req: Request, res: Response, next: NextFunction): unknown | Promise<unknown>;
}

export const asyncHandler = (fn: AsyncMiddleware): RequestHandler => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
