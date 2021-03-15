import { queryExecutor } from 'Utils/query-executor';

export interface Review {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  book_id: number;
  user_id: number;
}

export interface Quote {
  id: number;
  content: string;
  page: number;
  created_at: string;
  updated_at: string;
  book_id: number;
  user_id: number;
}
class SquareRepo {
  static async findAllReviews(): Promise<Review[]> {
    const query = `
      SELECT
        *
      FROM
        review
    `;
    const reviews = await queryExecutor(query);
    return reviews;
  }

  static async findAllQuotes(): Promise<Quote[]> {
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
