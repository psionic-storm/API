import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from 'Utils/jwt';
import { AuthenticateError } from 'Errors/authenticate-error';

export const TOKEN_KEY = 'authorization';

export function decodeJWT(req: Request, res: Response, next: NextFunction): void {
  if (!req.headers[TOKEN_KEY]) {
    next(new AuthenticateError());
    return;
  }
  const token = (req.headers[TOKEN_KEY] as string).split(' ')[1];
  const user = verifyJWT(token as string);
  req.user = user as Express.User;
  next();
  return;
}
