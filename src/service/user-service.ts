import { NextFunction, Request, Response } from 'express';
import UserRepo from 'Model/user-model';
import { createJWT } from 'Utils/jwt';
import bcrypt from 'bcrypt';
import { STATUS_CODE } from 'Constants';
import { DuplicateIdError } from 'Errors/authenticate-error';

export async function signUpWithEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body;

  const user = await UserRepo.findByEmail(email);

  if (user) {
    next(new DuplicateIdError());
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  const nickname = email.split('@')[0];

  const insertId = await UserRepo.createUser({
    email,
    nickname,
    password: hash,
  });

  res.status(STATUS_CODE.CREATED).json({ id: insertId, email, nickname });
}

export async function signInWithEmail(req: Request, res: Response): Promise<void> {
  const { id, email, nickname }: any = req.user;
  res.cookie('refreshToken', 'aslkdfjkldasjkldfjaslk');
  const accessToken = createJWT({ id, email, nickname });
  res.status(200).json({ accessToken });
}

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  const { id, email, nickname }: any = req.user;
  res.status(200).json({ id, email, nickname });
}
