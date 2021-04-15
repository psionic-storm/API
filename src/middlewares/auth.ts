import { NextFunction, Request, Response } from 'express';

export function isSignedIn(req: Request, res: Response, next: NextFunction): void {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.status(403).json('로긴필요');
}

export function isNotSignedIn(req: Request, res: Response, next: NextFunction): void {
  if (!req.headers['authorization']) {
    next();
    return;
  }
  res.status(403).json('이미 로그인 되어 있음');
}
