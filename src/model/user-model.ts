import { pool } from 'connection/connection';

interface User {
  loginId: string;
  nickname: string;
  password: string;
}

class User {
  static async createUser({ loginId, nickname, password }: User) {
    const connection = await pool.getConnection();
    const query = `INSERT INTO user(login_id, nickname, password) VALUES('${loginId}', '${nickname}', '${password}')`;
    const [{ insertId, _ }] = (await connection.query(query)) as any;
    connection.release();
    return insertId;
  }
}

export default User;
