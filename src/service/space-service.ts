import { Request, Response } from 'express';
import SpaceRepo from 'Model/space-model';
import { Space, Book } from 'Model/space-model';

class SpaceService {
  static async getSpace(req: Request, res: Response): Promise<void> {
    const { spaceId } = req.params;
    const space: Space = await SpaceRepo.findOneSpace(Number(spaceId));
    const books: Book[] = await SpaceRepo.findBooksInSpace(Number(spaceId));
    space.books = books;
    res.status(200).json(space);
  }

  // static async updateSpace(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.updateSpace();
  //   res.status(200).json(result);
  // }

  // static async getBook(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.findOneBook();
  //   res.status(200).json(result);
  // }

  // static async addBook(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.createBook();
  //   res.status(200).json(result);
  // }

  // static async deleteBook(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.deleteBook();
  //   res.status(200).json(result);
  // }

  // static async addReview(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.createReview();
  //   res.status(200).json(result);
  // }

  // static async updateReview(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.updateReview();
  //   res.status(200).json(result);
  // }

  // static async deleteReview(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.deleteReview();
  //   res.status(200).json(result);
  // }

  // static async getAllReviewComments(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.findAllReviewComments();
  //   res.status(200).json(result);
  // }

  // static async addReviewComment(req: Request, res: Response): Promise<void> {
  //   const result = await SpaceRepo.createReviewComment();
  //   res.status(200).json(result);
  // }

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
