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
        review.id id, 
        review.title title, 
        review.content content, 
        user.nickname reviewer, 
        review.created_at created_at, 
        review.updated_at updated_at, 
        book.title book_title, 
        book.author book_author, 
        salon.name salon, 
        space.name space 
      FROM 
        review 
      JOIN 
        book 
      ON 
        review.book_id=book.id 
      JOIN 
       user 
      ON 
        review.user_id=user.id 
      LEFT JOIN
        salon 
      ON 
        book.salon_id=salon.id 
      LEFT JOIN 
        space 
      ON 
        book.space_id=space.id
      ORDER BY
        review.updated_at
    `;
    const reviews = await queryExecutor(query);
    return reviews;
  }

  static async findAllQuotes(): Promise<Quote[]> {
    const query = `
      SELECT
        quote.id id, 
        quote.content content, 
        quote.page page, 
        user.nickname quoter, 
        quote.created_at created_at, 
        quote.updated_at updated_at, 
        book.title book_title, 
        book.author book_author, 
        salon.name salon, 
        space.name space 
      FROM 
        quote 
      JOIN 
        book 
      ON 
        quote.book_id=book.id 
      JOIN 
        user 
      ON 
        quote.user_id=user.id 
      LEFT JOIN
        salon 
      ON 
        book.salon_id=salon.id 
      LEFT JOIN 
        space 
      ON 
        book.space_id=space.id
      ORDER BY
        quote.updated_at
    `;
    const quotes = await queryExecutor(query);
    return quotes;
  }
}

export default SquareRepo;
