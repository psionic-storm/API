import { NextFunction, Request, Response } from 'express';
import SpaceRepo from 'Model/space-model';
import { JWTKey } from 'Utils/jwt';

export async function checkPermission(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.user as JWTKey;

  if (req.params.reviewId) {
    const reviewId = parseInt(req.params.reviewId);
    const { user_id }: any = await SpaceRepo.findUserByReviewId(reviewId);
    if (id !== user_id) {
      res.status(401).json({ message: "Permission denied. It's not your review" });
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
