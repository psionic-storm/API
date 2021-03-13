import jwt from 'jsonwebtoken';
import User, { PublicUserInfo } from 'Model/user-model';

export function createJWT(loginId: string): string {
  return jwt.sign({ loginId }, process.env.JWT_TOKEN || '');
}

export async function verifyJWT(token: string): Promise<PublicUserInfo | null> {
  const verifyResult: any = jwt.verify(token, process.env.JWT_TOKEN || '');
  if (!verifyResult) {
    return null;
  }
  console.log({ verifyResult });

  const { loginId } = verifyResult;
  return await User.findPublicUserInfoByLoginId(loginId);
}
