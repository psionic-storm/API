import { queryExecutor } from 'Utils/query-executor';
import { Quote, Review } from './square-model';

export interface Space {
  id: number;
  name: string;
  owner_id: string;
  owner_nickname: string;
  books?: Book[];
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  reviews?: Review[];
  quotes?: Quote[];
}

export interface updateSpaceParams {
  name: string;
  spaceId: number;
}
export interface createBookParams {
  title: string;
  author: string;
  description: string;
  spaceId: number;
}

export interface createReviewParams {
  title: string;
  content: string;
  bookId: number;
  userId: number;
}

export interface UpdateReviewParams {
  title: string;
  content: string;
  reviewId: number;
}

class SpaceRepo {
  static async findUserBySpaceId(spaceId: number): Promise<number> {
    const query = `
      SELECT
        space.user_id
      FROM
        space
      WHERE
        space.id=${spaceId}
    `;
    const result = await queryExecutor(query);
    return result[0];
  }

  static async findOneSpace(spaceId: number): Promise<Space> {
    const query = `
      SELECT 
        space.id id, 
        space.name name, 
        user.id owner_id, 
        user.nickname owner_nickname 
      FROM 
        space
      JOIN 
        user 
      ON
        space.user_id=user.id
      WHERE
        space.id=${spaceId}
    `;
    const result = await queryExecutor(query);
    return result[0];
  }

  static async findAllBooksInSpace(spaceId: number): Promise<Book[]> {
    const query = `
      SELECT
        id, 
        title, 
        author, 
        description
      FROM
        book
      WHERE 
        book.space_id=${spaceId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async updateSpace({ spaceId, name }: updateSpaceParams): Promise<any> {
    const query = `
      UPDATE
        space
      SET 
        name='${name}',
        updated_at=NOW()
      WHERE 
        id=${spaceId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async findOneBook(bookId: number): Promise<Book> {
    const query = `
      SELECT
        id, 
        title, 
        author, 
        description
      FROM
        book
      WHERE 
        book.id=${bookId}
  `;
    const result = await queryExecutor(query);
    return result[0];
  }

  static async findAllReviewsInBook(bookId: number): Promise<Review[]> {
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
      WHERE
        review.book_id=${bookId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async findAllQuotesInBook(bookId: number): Promise<Quote[]> {
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
      WHERE
        quote.book_id=${bookId}
  `;
    const result = await queryExecutor(query);
    return result;
  }

  static async createBook({ title, author, description, spaceId }: createBookParams): Promise<number> {
    const query = `
      INSERT INTO
        book(title, author, description, created_at, space_id)
      VALUES('${title}', '${author}', '${description}', NOW(), ${spaceId})
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async deleteBook(bookId: number): Promise<any> {
    const query = `
      DELETE FROM
        book
      WHERE
        id=${bookId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async createReview({ title, content, bookId, userId }: createReviewParams): Promise<any> {
    const query = `
      INSERT INTO 
        review(title, content, created_at, updated_at, book_id, user_id)
      VALUES('${title}', '${content}', NOW(), NOW(), ${bookId}, ${userId})
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async findUserByReviewId(reviewId: number): Promise<number> {
    const query = `
      SELECT
        review.user_id
      FROM
        review
      WHERE
        review.id=${reviewId}
    `;
    const result = await queryExecutor(query);
    return result[0];
  }

  static async updateReview({ title, content, reviewId }: UpdateReviewParams): Promise<any> {
    const query = `
      UPDATE
        review
      SET 
        title='${title}',
        content='${content}',
        updated_at=NOW()
      WHERE 
        id=${reviewId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  // static async deleteReview(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async findAllReviewComments(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async createReviewComment(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async updateReviewComment(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async deleteReviewComment(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async createQuote(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async updateQuote(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async deleteQuote(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async findAllQuoteComments(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async createQuoteComment(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async updateQuoteComment(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async deleteQuoteComment(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }
}

export default SpaceRepo;
