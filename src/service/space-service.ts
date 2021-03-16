import { Request, Response } from 'express';
import SpaceRepo from 'Model/space-model';

class SpaceService {
  static async getSpace(req: Request, res: Response): Promise<void> {
    const spaceId = parseInt(req.params.spaceId);
    const space = await SpaceRepo.findOneSpace(spaceId);
    const books = await SpaceRepo.findAllBooksInSpace(spaceId);
    space.books = books;
    res.status(200).json(space);
  }

  static async updateSpace(req: Request, res: Response): Promise<void> {
    console.log(req.user);
    const spaceId = parseInt(req.params.spaceId);
    const { name } = req.body;
    await SpaceRepo.updateSpace({ spaceId, name });
    res.status(200).json({ message: 'modified successfully' });
  }

  static async getBook(req: Request, res: Response): Promise<void> {
    const bookId = parseInt(req.params.bookId);
    const book = await SpaceRepo.findOneBook(bookId);
    const reviews = await SpaceRepo.findAllReviewsInBook(bookId);
    const quotes = await SpaceRepo.findAllQuotesInBook(bookId);
    console.log(reviews);
    book.reviews = reviews;
    book.quotes = quotes;
    res.status(200).json(book);
  }

  static async addBook(req: Request, res: Response): Promise<void> {
    const spaceId = parseInt(req.params.spaceId);
    const { title, author, description } = req.body;
    const result = await SpaceRepo.createBook({ title, author, description, spaceId });
    res.status(200).json(result);
  }

  static async deleteBook(req: Request, res: Response): Promise<void> {
    const bookId = parseInt(req.params.bookId);
    const { affectedRows } = await SpaceRepo.deleteBook(bookId);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'deleted successfully' });
      return;
    }
    res.status(200).json({ messgage: 'DB: no items to delete' });
  }

  static async addReview(req: Request, res: Response): Promise<void> {
    const bookId = parseInt(req.params.bookId);
    const userId = parseInt((req.user as any).id);
    const { title, content } = req.body;
    const result = await SpaceRepo.createReview({ title, content, bookId, userId });
    res.status(200).json(result);
  }

  static async updateReview(req: Request, res: Response): Promise<void> {
    const reviewId = parseInt(req.params.reviewId);
    const { title, content } = req.body;
    await SpaceRepo.updateReview({ title, content, reviewId });
    res.status(200).json({ message: 'modified successfully' });
  }

  static async deleteReview(req: Request, res: Response): Promise<void> {
    const reviewId = parseInt(req.params.reviewId);
    const { affectedRows } = await SpaceRepo.deleteReview(reviewId);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'deleted successfully' });
      return;
    }
    res.status(200).json({ messgage: 'DB: no items to delete' });
  }

  static async getAllReviewComments(req: Request, res: Response): Promise<void> {
    const reviewId = parseInt(req.params.reviewId);
    const result = await SpaceRepo.findAllReviewComments(reviewId);
    res.status(200).json(result);
  }

  static async addReviewComment(req: Request, res: Response): Promise<void> {
    const reviewId = parseInt(req.params.reviewId);
    const bookId = parseInt(req.params.bookId);
    const userId = parseInt((req.user as any).id);
    const { comment } = req.body;

    const result = await SpaceRepo.createReviewComment({ comment, reviewId, bookId, userId });
    res.status(200).json(result);
  }

  // static async updateReviewComment(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.updateReviewComment();
  //   res.status(200).json(result);
  // }

  // static async deleteReviewComment(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.deleteReviewComment();
  //   res.status(200).json(result);
  // }

  // static async addQuote(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.createQuote();
  //   res.status(200).json(result);
  // }

  // static async updateQuote(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.updateQuote();
  //   res.status(200).json(result);
  // }

  // static async deleteQuote(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.deleteQuote();
  //   res.status(200).json(result);
  // }

  // static async getAllQuoteComments(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.findAllQuoteComments();
  //   res.status(200).json(result);
  // }

  // static async addQuoteComment(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.createQuoteComment();
  //   res.status(200).json(result);
  // }

  // static async updateQuoteComment(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.updateQuoteComment();
  //   res.status(200).json(result);
  // }

  // static async deleteQuoteComment(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.deleteQuoteComment();
  //   res.status(200).json(result);
  // }
}

export default SpaceService;
