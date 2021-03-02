import { pool } from 'connection/connection';
import { queryExecutor } from 'utils/query-executor';

interface User {
  loginId: string;
  nickname: string;
  passwordHash: { password: string; salt: string };
}

class User {
  static async createUser({
    loginId,
    nickname,
    passwordHash: { password, salt },
  }: User): Promise<number> {
    const query = `INSERT INTO user(login_id, nickname, password, salt) VALUES('${loginId}', '${nickname}', '${password}', '${salt}')`;
    return await queryExecutor(query);
  }

  static async getUserById(id: number): Promise<User> {
    const query = `SELECT * FROM user WHERE id=${id}`;
    const user: User[] = await queryExecutor(query);
    return user[0];
  }

  static async getUserByLoginId(loginId: number): Promise<User> {
    const query = `SELECT * FROM user WHERE login_id='${loginId}'`;
    const user: User[] = await queryExecutor(query);
    return user[0];
  }
}

export default User;
