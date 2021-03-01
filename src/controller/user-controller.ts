import User from 'model/user-model';
import { Request, Response } from 'express';

export async function createUser(req: Request, res: Response): Promise<any> {
  const { loginId, nickname, password } = req.body;
  const insertId = await User.createUser({
    loginId,
    nickname,
    password,
  });
  res.status(201).json(insertId);
}