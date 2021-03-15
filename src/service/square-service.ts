import { Request, Response } from 'express';
import SquareRepo from 'Model/square-model';

export async function getAllReviews(
  req: Request,
  res: Response,
): Promise<void> {
  const reviews = await SquareRepo.findAllReviews();
  res.status(200).json(reviews);
}

export async function getAllQuotes(req: Request, res: Response): Promise<void> {
  const quotes = await SquareRepo.findAllQuotes();
  res.status(200).json(quotes);
}
