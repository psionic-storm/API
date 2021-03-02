import { pool } from 'connection/connection';

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
    const connection = await pool.getConnection();
    const query = `INSERT INTO user(login_id, nickname, password, salt) VALUES('${loginId}', '${nickname}', '${password}', '${salt}')`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ insertId, _ }] = (await connection.query(query)) as any;
    connection.release();
    return insertId;
  }

  static async getUserById(id: number): Promise<User> {
    const connection = await pool.getConnection();
    const query = `SELECT * FROM user WHERE id=${id}`;
    const [user] = (await connection.query(query)) as any;
    connection.release();
    return user[0];
  }

  static async getUserByLoginId(loginId: number): Promise<User> {
    const connection = await pool.getConnection();
    const query = `SELECT * FROM user WHERE login_id='${loginId}'`;
    const [user] = (await connection.query(query)) as any;
    connection.release();
    return user[0];
  }
}

export default User;
