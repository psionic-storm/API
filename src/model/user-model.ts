import { queryExecutor } from 'utils/query-executor';
interface createUserParams {
  loginId: string;
  nickname: string;
  passwordHash: { password: string; salt: string };
}

export interface UserInfo {
  id: number;
  login_id: string;
  nickname: string;
  password: string;
  salt: string;
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

  static async findById(id: number): Promise<UserInfo> {
    const query = `SELECT * FROM user WHERE id=${id}`;
    const user: UserInfo[] = await queryExecutor(query);
    return user[0];
  }

  static async findByLoginId(loginId: string): Promise<UserInfo> {
    const query = `SELECT id, login_id, nickname FROM user WHERE login_id='${loginId}'`;
    const user: UserInfo[] = await queryExecutor(query);
    return user[0];
  }
}

export default User;
