import { pool } from 'connection/connection';
import { databaseErrorHandler } from 'utils/error-handler';
import { promiseHandler } from 'utils/promise-handler';

export async function queryExecutor(query: string): Promise<any> {
  const connection = await pool.getConnection();
  const [queryResult, error] = await promiseHandler(connection.query(query));

  databaseErrorHandler(error);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, _] = queryResult;
  connection.release();

  if (/^insert/i.test(query)) {
    return result.insertId;
  }

  return result;
}
