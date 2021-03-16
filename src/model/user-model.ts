import { queryExecutor } from 'Utils/query-executor';
import { CreateUserParams } from 'Types/repository-param';

export interface UserInfo {
  id: number;
  login_id: string;
  nickname: string;
  hashed_password: string;
  salt: string;
}

export interface PublicUserInfo {
  id: number;
  login_id: string;
  nickname: string;
}

class UserRepo {
  static async createUser({
    loginId,
    nickname,
    hashedPasswordAndSalt: { hashedPassword, salt },
  }: CreateUserParams): Promise<number> {
    const query = `
      INSERT INTO 
        user(login_id, nickname, hashed_password, salt, created_at) 
      VALUES('${loginId}', '${nickname}', '${hashedPassword}', '${salt}', NOW())
    `;
    return await queryExecutor(query);
  }

  static async findPublicUserInfoByLoginId(loginId: string): Promise<PublicUserInfo> {
    const query = `
      SELECT 
        id, login_id, nickname 
      FROM
        user 
      WHERE 
        login_id='${loginId}'
    `;
    const user: PublicUserInfo[] = await queryExecutor(query);
    return user[0];
  }

  static async findByLoginId(loginId: string): Promise<UserInfo> {
    const query = `
      SELECT
        * 
      FROM 
        user 
      WHERE 
        login_id='${loginId}'
    `;
    const user: UserInfo[] = await queryExecutor(query);
    return user[0];
  }
}

export default UserRepo;
