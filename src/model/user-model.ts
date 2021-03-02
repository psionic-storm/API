import { queryExecutor } from 'utils/query-executor';
export interface createUserParams {
  loginId: string;
  nickname: string;
  passwordHash: { password: string; salt: string };
}

export interface PublicUserInfo {
  id: number;
  login_id: string;
  nickname: string;
}

class User {
  static async createUser({
    loginId,
    nickname,
    passwordHash: { password, salt },
  }: createUserParams): Promise<number> {
    const query = `INSERT INTO user(login_id, nickname, password, salt) VALUES('${loginId}', '${nickname}', '${password}', '${salt}')`;
    return await queryExecutor(query);
  }

  static async findById(id: number): Promise<PublicUserInfo> {
    const query = `SELECT * FROM user WHERE id=${id}`;
    const user: PublicUserInfo[] = await queryExecutor(query);
    return user[0];
  }

  static async findByLoginId(loginId: number): Promise<PublicUserInfo> {
    const query = `SELECT id, login_id, nickname FROM user WHERE login_id='${loginId}'`;
    const user: PublicUserInfo[] = await queryExecutor(query);
    return user[0];
  }
}

export default User;
