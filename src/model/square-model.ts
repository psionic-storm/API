import { queryExecutor } from 'Utils/query-executor';

class SquareRepo {
  static async findAllReviews(): Promise<any> {
    const query = `
      SELECT
        *
      FROM
        review
    `;
    const reviews = await queryExecutor(query);
    return reviews;
  }

  static async findAllQuotes(): Promise<any> {
    const query = `
      SELECT
        *
      FROM
        quote
    `;
    const quotes = await queryExecutor(query);
    return quotes;
  }
}

export default SquareRepo;
