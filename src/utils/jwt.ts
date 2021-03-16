import jwt from 'jsonwebtoken';
import UserRepo, { PublicUserInfo } from 'Model/user-model';

interface JWTKey {
  id: number;
  loginId: string;
  nickname: string;
}

export function createJWT({ id, loginId, nickname }: JWTKey): string {
  return jwt.sign({ id, loginId, nickname }, process.env.JWT_SECRET || '');
}

export async function verifyJWT(token: string): Promise<JWTKey | null> {
  const verifyResult: any = jwt.verify(token, process.env.JWT_SECRET || '');
  if (!verifyResult) {
    return null;
  }
  return verifyResult;
}
