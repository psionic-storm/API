import { Request, Response } from 'express';
import User from 'model/user-model';
import { createPasswordHash } from 'utils/salt';

export async function createUser(req: Request, res: Response): Promise<void> {
  const { loginId, nickname, password } = req.body;

  const user = await User.findByLoginId(loginId);
  if (user) {
    res.status(409).json({ message: '이미 있는 아이디' });
    return;
  }

  const passwordHash = await createPasswordHash(password);

  const insertId = await User.createUser({
    loginId,
    nickname,
    passwordHash,
  });
  res.status(201).json(insertId);
}

// export async function sendAccessToken(
//   req: Request,
//   res: Response,
// ): Promise<void> {
//   res.status(200).json({ accessToken });
// }

export async function getCurrentUser(
  req: Request,
  res: Response,
): Promise<void> {
  const { loginId } = req.body;
  const user = await User.findByLoginId(loginId);
  res.status(200).json(user);
}
