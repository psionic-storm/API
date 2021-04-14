import { Request, Response } from 'express';
import UserRepo from 'Model/user-model';
import { createJWT } from 'Utils/jwt';
import bcrypt from 'bcrypt';
import { ERROR_JSON } from 'Constants';

export async function signUpWithEmail(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const user = await UserRepo.findByEmail(email);

  if (user) {
    res.status(409).json(ERROR_JSON.DUPLICATE_ID);
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  const nickname = email.split('@')[0];

  const insertId = await UserRepo.createUser({
    email,
    nickname,
    password: hash,
  });

  res.status(201).json(insertId);
}

export async function signInByLoginId(req: Request, res: Response): Promise<void> {
  const { id, login_id, nickname }: any = req.user;
  const accessToken = createJWT({ id, loginId: login_id, nickname });
  res.status(200).json({ accessToken });
}

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  const { id, login_id, nickname }: any = req.user;
  res.status(200).json({ id, login_id, nickname });
}
