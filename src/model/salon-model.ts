import { queryExecutor } from 'Utils/query-executor';
import { Quote, Review } from './square-model';

export interface Salon {
  id: number;
  name: string;
  owner_id: string;
  owner_nickname: string;
  books?: Book[];
  participants?: Participant[];
}

export interface Participant {
  id: number;
  login_id: string;
  nickname: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  reviews?: Review[];
  quotes?: Quote[];
}

export interface Comment {
  id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  commenter: string;
}

export interface CreateSalonParams {
  name: string;
  userId: number;
}

export interface AddSalonMemberParams {
  salonId: number;
  userId: number;
}

export interface UpdateSalonParams {
  name: string;
  salonId: number;
}
export interface CreateBookParams {
  title: string;
  author: string;
  description: string;
  salonId: number;
}

export interface CreateReviewParams {
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

export interface CreateReviewCommentParams {
  comment: string;
  reviewId: number;
  bookId: number;
  userId: number;
}

export interface UpdateReviewCommentParams {
  comment: string;
  commentId: number;
}

export interface CreateQuoteParams {
  content: string;
  page: number;
  bookId: number;
  userId: number;
}

export interface UpdateQuoteParams {
  content: string;
  page: number;
  quoteId: number;
}

export interface CreateQuoteCommentParams {
  comment: string;
  quoteId: number;
  bookId: number;
  userId: number;
}

export interface UpdateQuoteCommentParams {
  comment: string;
  commentId: number;
}

class SalonRepo {
  static async createSalon({ name, userId }: CreateSalonParams): Promise<any> {
    const query = `
      INSERT INTO
        salon(name, creator_id, created_at, updated_at)
      VALUES('${name}', ${userId}, NOW(), NOW())
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async addSalonMember({ salonId, userId }: AddSalonMemberParams): Promise<any> {
    const query = `
      INSERT INTO
        salon_has_user(salon_id, user_id, created_at, updated_at)
      VALUES(${salonId}, ${userId}, NOW(), NOW())
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async findUserBySalonId(salonId: number): Promise<number> {
    const query = `
      SELECT
        salon.user_id
      FROM
        salon
      WHERE
        salon.id=${salonId}
    `;
    const result = await queryExecutor(query);
    return result[0];
  }

  static async findOneSalon(salonId: number): Promise<Salon> {
    const query = `
      SELECT
        salon.id id,
        salon.name name,
        user.nickname creator_nickname
      FROM 
        salon
      JOIN
        user
      ON
        creator_id=user.id
      WHERE
        salon.id=${salonId}
    `;
    const result = await queryExecutor(query);
    return result[0];
  }

  static async findAllUsersInSalon(salonId: number): Promise<Participant[]> {
    const query = `
      SELECT
        user.id id,
        user.login_id login_id, 
        user.nickname nickname
      FROM
        salon_has_user
      JOIN
        user
      ON
        salon_has_user.user_id=user.id
      WHERE 
        salon_has_user.salon_id=${salonId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async findAllBooksInSalon(salonId: number): Promise<Book[]> {
    const query = `
      SELECT
        id, 
        title, 
        author, 
        description
      FROM
        book
      WHERE 
        book.salon_id=${salonId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async updateSalon({ salonId, name }: UpdateSalonParams): Promise<any> {
    const query = `
      UPDATE
        salon
      SET 
        name='${name}',
        updated_at=NOW()
      WHERE 
        id=${salonId}
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

  static async createBook({ title, author, description, salonId }: CreateBookParams): Promise<number> {
    const query = `
      INSERT INTO
        book(title, author, description, created_at, salon_id)
      VALUES('${title}', '${author}', '${description}', NOW(), ${salonId})
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

  static async createReview({ title, content, bookId, userId }: CreateReviewParams): Promise<any> {
    const query = `
      INSERT INTO 
        review(title, content, created_at, updated_at, book_id, user_id)
      VALUES('${title}', '${content}', NOW(), NOW(), ${bookId}, ${userId})
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async findUserByReviewId(reviewId: number): Promise<any> {
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

  static async deleteReview(reviewId: number): Promise<any> {
    const query = `      
      DELETE FROM
        review
      WHERE
        id=${reviewId}`;
    const result = await queryExecutor(query);
    return result;
  }

  static async findAllReviewComments(reviewId: number): Promise<Comment[]> {
    const query = `
      SELECT 
        review_comment.id id,
        review_comment.comment comment,
        review_comment.created_at created_at,
        review_comment.updated_at updated_at,
        user.nickname commenter
      FROM
        review_comment
      JOIN
        user 
      ON 
        review_comment.user_id=user.id
      WHERE
        review_comment.review_id=${reviewId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async createReviewComment({ comment, reviewId, bookId, userId }: CreateReviewCommentParams): Promise<number> {
    const query = `
      INSERT INTO 
        review_comment(comment, created_at, updated_at, review_id, review_book_id, user_id)
      VALUES('${comment}', NOW(), NOW(), ${reviewId}, ${bookId}, ${userId})
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async findUserByReviewCommentId(commentId: number): Promise<any> {
    const query = `
      SELECT
        review_comment.user_id
      FROM
        review_comment
      WHERE
        review_comment.id=${commentId}
    `;
    const result = await queryExecutor(query);
    return result[0];
  }

  static async updateReviewComment({ comment, commentId }: UpdateReviewCommentParams): Promise<any> {
    const query = `
      UPDATE
        review_comment
      SET 
        comment='${comment}',
        updated_at=NOW()
      WHERE 
        id=${commentId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async deleteReviewComment(commentId: number): Promise<any> {
    const query = `      
      DELETE FROM
        review_comment
      WHERE
        id=${commentId}`;
    const result = await queryExecutor(query);
    return result;
  }

  static async findUserByQuoteId(QuoteId: number): Promise<any> {
    const query = `
      SELECT
        quote.user_id
      FROM
        quote
      WHERE
        quote.id=${QuoteId}
    `;
    const result = await queryExecutor(query);
    return result[0];
  }

  static async findUserByQuoteCommentId(commentId: number): Promise<any> {
    const query = `
      SELECT
        quote_comment.user_id
      FROM
        quote_comment
      WHERE
        quote_comment.id=${commentId}
    `;
    const result = await queryExecutor(query);
    return result[0];
  }

  static async createQuote({ content, page, bookId, userId }: CreateQuoteParams): Promise<any> {
    const query = `
      INSERT INTO 
        quote(content, page, created_at, updated_at, book_id, user_id)
      VALUES('${content}', '${page}', NOW(), NOW(), ${bookId}, ${userId})
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async updateQuote({ content, page, quoteId }: UpdateQuoteParams): Promise<any> {
    const query = `
      UPDATE
        quote
      SET 
        content='${content}',
        page='${page}',
        updated_at=NOW()
      WHERE 
        id=${quoteId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async deleteQuote(quoteId: number): Promise<any> {
    const query = `      
      DELETE FROM
        quote
      WHERE
        id=${quoteId}`;
    const result = await queryExecutor(query);
    return result;
  }

  static async findAllQuoteComments(quoteId: number): Promise<Comment[]> {
    const query = `
      SELECT 
        quote_comment.id id,
        quote_comment.comment comment,
        quote_comment.created_at created_at,
        quote_comment.updated_at updated_at,
        user.nickname commenter
      FROM
        quote_comment
      JOIN
        user 
      ON 
        quote_comment.user_id=user.id
      WHERE
        quote_comment.quote_id=${quoteId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async createQuoteComment({ comment, quoteId, bookId, userId }: CreateQuoteCommentParams): Promise<number> {
    const query = `
      INSERT INTO 
        quote_comment(comment, created_at, updated_at, quote_id, quote_book_id, user_id)
      VALUES('${comment}', NOW(), NOW(), ${quoteId}, ${bookId}, ${userId})
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async updateQuoteComment({ comment, commentId }: UpdateQuoteCommentParams): Promise<any> {
    const query = `
      UPDATE
        quote_comment
      SET 
        comment='${comment}',
        updated_at=NOW()
      WHERE 
        id=${commentId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async deleteQuoteComment(commentId: number): Promise<any> {
    const query = `      
      DELETE FROM
        quote_comment
      WHERE
        id=${commentId}`;
    const result = await queryExecutor(query);
    return result;
  }
}

export default SalonRepo;