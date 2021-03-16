import { Request, Response } from 'express';
import UserRepo from 'Model/user-model';
import { createPasswordHash } from 'Utils/salt';
import { createJWT } from 'Utils/jwt';

export async function signUpByLoginId(req: Request, res: Response): Promise<void> {
  const { loginId, nickname, password } = req.body;

  const user = await UserRepo.findByLoginId(loginId);
  if (user) {
    res.status(409).json({ message: '이미 있는 아이디' });
    return;
  }

  const hashedPasswordAndSalt = await createPasswordHash(password);

  const insertId = await UserRepo.createUser({
    loginId,
    nickname,
    hashedPasswordAndSalt,
  });
  res.status(201).json(insertId);
}

export async function signInByLoginId(req: Request, res: Response): Promise<void> {
  const { id, login_id, nickname }: any = req.user;
  const accessToken = createJWT({ id, loginId: login_id, nickname });
  res.status(200).json({ accessToken });
}

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  res.json(req.user);
}
