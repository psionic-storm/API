import { NextFunction, Request, Response } from 'express';
import SpaceRepo from 'Model/space-model';
import { JWTKey } from 'Utils/jwt';

export async function checkPermission(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.user as JWTKey;

  if (req.params.commentId) {
    const commentId = parseInt(req.params.commentId);
    let result;
    if (req.params.reviewId) {
      result = await SpaceRepo.findUserByReviewCommentId(commentId);
    }
    if (req.params.quoteId) {
      result = await SpaceRepo.findUserByQuoteCommentId(commentId);
    }

    if (!result) {
      res.status(200).json({ message: 'no items to update(delete)' });
      return;
    }
    if (id !== result.user_id) {
      res.status(401).json({ message: "Permission denied. It's not your review" });
      return;
    }
    next();
    return;
  }

  if (req.params.reviewId) {
    const reviewId = parseInt(req.params.reviewId);
    const result: any = await SpaceRepo.findUserByReviewId(reviewId);
    if (!result) {
      res.status(200).json({ message: 'no items to update(delete)' });
      return;
    }
    if (id !== result.user_id) {
      res.status(401).json({ message: "Permission denied. It's not your review" });
      return;
    }
    next();
    return;
  }

  if (req.params.quoteId) {
    const quoteId = parseInt(req.params.quoteId);
    const result: any = await SpaceRepo.findUserByQuoteId(quoteId);
    if (!result) {
      res.status(200).json({ message: 'no items to update(delete)' });
      return;
    }
    if (id !== result.user_id) {
      res.status(401).json({ message: "Permission denied. It's not your quote" });
      return;
    }
    next();
    return;
  }

  if (req.params.spaceId) {
    const spaceId = parseInt(req.params.spaceId);
    const { user_id }: any = await SpaceRepo.findUserBySpaceId(spaceId);
    if (id !== user_id) {
      res.status(401).json({ message: "Permission denied. It's not your space" });
      return;
    }
    next();
    return;
  }
}
