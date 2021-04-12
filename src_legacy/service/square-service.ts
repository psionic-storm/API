import { Request, Response } from 'express';
import SquareRepo from 'Model/square-model';

class SquareService {
  static async getAllReviews(req: Request, res: Response): Promise<void> {
    const reviews = await SquareRepo.findAllReviews();
    res.status(200).json(reviews);
  }

  static async getAllQuotes(req: Request, res: Response): Promise<void> {
    const quotes = await SquareRepo.findAllQuotes();
    res.status(200).json(quotes);
  }
}

export default SquareService;
