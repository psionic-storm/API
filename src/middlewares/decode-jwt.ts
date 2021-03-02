import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt';
import { AuthenticateError } from '../errors/authenticate-error';

export const TOKEN_KEY = 'authorization';

export async function decodeJWT(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = (req.headers[TOKEN_KEY] as string).split(' ')[1];
  if (token) {
    const user = await verifyJWT(token as string);
    req.user = user as Express.User;
    next();
    return;
  }

  next(new AuthenticateError());
}
