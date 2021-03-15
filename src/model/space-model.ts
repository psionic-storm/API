import { queryExecutor } from 'Utils/query-executor';

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
}

class SpaceRepo {
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

  static async findBooksInSpace(spaceId: number): Promise<Book[]> {
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

  // static async updateSpace(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async findOneBook(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async createBook(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async deleteBook(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async createReview(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

  // static async updateReview(): Promise<> {
  //   const query = ``;
  //   const result = await queryExecutor(query);
  //   return result;
  // }

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
