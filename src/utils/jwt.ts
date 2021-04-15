import jwt from 'jsonwebtoken';

export interface JWTKey {
  id: number;
  email: string;
  nickname: string;
}

export function createJWT({ id, email, nickname }: JWTKey): string {
  return jwt.sign({ id, email, nickname }, process.env.JWT_SECRET || '');
}

export function verifyJWT(token: string): JWTKey | null {
  const verifyResult: any = jwt.verify(token, process.env.JWT_SECRET || '');
  if (!verifyResult) {
    return null;
  }
  return verifyResult;
}
