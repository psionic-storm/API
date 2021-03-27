import { queryExecutor } from 'Utils/query-executor';
import {
  CreateSpaceParams,
  UpdateSpaceParams,
  CreateBookParams,
  CreateReviewParams,
  UpdateReviewParams,
  CreateReviewCommentParams,
  UpdateReviewCommentParams,
  CreateQuoteParams,
  UpdateQuoteParams,
  CreateQuoteCommentParams,
  UpdateQuoteCommentParams,
} from 'Types/repository-param';
import { Space, Book, Review, Quote, Comment } from 'Types/repository-return';

class SpaceRepo {
  static async createSpace({ userNickname, userId }: CreateSpaceParams): Promise<number> {
    const query = `
      INSERT INTO
        space(name, created_at, updated_at, user_id)
      VALUES("${userNickname}'s Space", NOW(), NOW(), ${userId})
    `;
    const result = await queryExecutor(query);
    return result;
  }

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
        user.nickname owner_nickname,
        user.login_id owner_loginId
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

  static async findSpaceByUserId(userId: number): Promise<any> {
    const query = `
      SELECT 
        space.id spaceId
      FROM 
        space
      JOIN 
        user 
      ON
        space.user_id=user.id
      WHERE
        user.id=${userId}
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
        description,
        thumbnail
      FROM
        book
      WHERE 
        book.space_id=${spaceId}
    `;
    const result = await queryExecutor(query);
    return result;
  }

  static async updateSpace({ spaceId, name }: UpdateSpaceParams): Promise<any> {
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
        description,
        thumbnail
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
        book.thumbnail book_thumbnail, 
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
        book.thumbnail book_thumbnail, 
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

  static async createBook({ title, author, description, thumbnail, spaceId }: CreateBookParams): Promise<number> {
    const query = `
      INSERT INTO
        book(title, author, description, thumbnail, created_at, space_id)
      VALUES('${title}', '${author}', '${description}', '${thumbnail}', NOW(), ${spaceId})
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

export default SpaceRepo;
