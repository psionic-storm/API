import { Request, Response } from 'express';
import User from 'model/user-model';
import { createPasswordHash } from 'utils/salt';
import { createJWT } from 'utils/jwt';

export async function signUpByLoginId(
  req: Request,
  res: Response,
): Promise<void> {
  const { loginId, nickname, password } = req.body;

  const user = await User.findByLoginId(loginId);
  if (user) {
    res.status(409).json({ message: '이미 있는 아이디' });
    return;
  }

  const hashedPasswordAndSalt = await createPasswordHash(password);

  const insertId = await User.createUser({
    loginId,
    nickname,
    hashedPasswordAndSalt,
  });
  res.status(201).json(insertId);
}

export async function signInByLoginId(
  req: Request,
  res: Response,
): Promise<void> {
  const accessToken = createJWT(req.user['id'] as string);
  res.status(200).json({ accessToken });
}

export async function getCurrentUser(
  req: Request,
  res: Response,
): Promise<void> {
  res.json(req.user);
}
