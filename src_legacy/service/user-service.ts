import { Request, Response } from 'express';
import UserRepo from 'Model/user-model';
import { createPasswordHash } from 'Utils/salt';
import { createJWT } from 'Utils/jwt';
import SpaceRepo from 'Model/space-model';

export async function signUpByLoginId(req: Request, res: Response): Promise<void> {
  const { loginId, nickname, password } = req.body;

  const user = await UserRepo.findByLoginId(loginId);
  if (user) {
    res.status(409).json({ message: 'ID already exists' });
    return;
  }

  const hashedPasswordAndSalt = await createPasswordHash(password);

  const insertId = await UserRepo.createUser({
    loginId,
    nickname,
    hashedPasswordAndSalt,
  });

  await SpaceRepo.createSpace({ userNickname: nickname, userId: insertId });

  res.status(201).json(insertId);
}

export async function signInByLoginId(req: Request, res: Response): Promise<void> {
  const { id, login_id, nickname }: any = req.user;
  const accessToken = createJWT({ id, loginId: login_id, nickname });
  res.status(200).json({ accessToken });
}

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  const { id, login_id, nickname }: any = req.user;
  const { spaceId } = await SpaceRepo.findSpaceByUserId(id);
  res.status(200).json({ id, login_id, nickname, spaceId });
}