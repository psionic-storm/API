import { Router } from 'express';
import SpaceService from 'Service/space-service';
import { validateBody } from 'Middlewares/validate-body';
import { decodeJWT } from 'Middlewares/decode-jwt';
import { checkPermission } from 'Middlewares/check-permission';

const spaceRouter = Router();

export interface UpdateSpaceBody {
  name: string;
}

spaceRouter.get('/:spaceId', SpaceService.getSpace);
spaceRouter.patch(
  '/:spaceId',
  decodeJWT,
  checkPermission,
  validateBody<UpdateSpaceBody>(['name']),
  SpaceService.updateSpace,
);

export interface AddBookBody {
  title: string;
  author: string;
  description: string;
}

spaceRouter.get('/:spaceId/book/:bookId', SpaceService.getBook);
spaceRouter.post(
  '/:spaceId/book',
  decodeJWT,
  checkPermission,
  validateBody<AddBookBody>(['title', 'author', 'description']),
  SpaceService.addBook,
);
spaceRouter.delete('/:spaceId/book/:bookId', decodeJWT, checkPermission, SpaceService.deleteBook);

// spaceRouter.post('/:spaceId/book/:bookId/review', SpaceService.addReview);
// spaceRouter.patch('/:spaceId/book/:bookId/review/:reviewId', SpaceService.updateReview);
// spaceRouter.delete('/:spaceId/book/:bookId/review/:reviewId', SpaceService.deleteReview);

// spaceRouter.get('/:spaceId/book/:bookId/review/:reviewId/comment', SpaceService.getAllReviewComments);
// spaceRouter.post('/:spaceId/book/:bookId/review/:reviewId/comment', SpaceService.addReviewComment);
// spaceRouter.patch('/:spaceId/book/:bookId/review/:reviewId/comment/:commentId', SpaceService.updateReviewComment);
// spaceRouter.delete('/:spaceId/book/:bookId/review/:reviewId/comment/:commentId', SpaceService.deleteReviewComment);

// spaceRouter.post('/:spaceId/book/:bookId/quote', SpaceService.addQuote);
// spaceRouter.patch('/:spaceId/book/:bookId/quote/:quoteId', SpaceService.updateQuote);
// spaceRouter.delete('/:spaceId/book/:bookId/quote/:quoteId', SpaceService.deleteQuote);

// spaceRouter.get('/:spaceId/book/:bookId/quote/:quoteId/comment', SpaceService.getAllQuoteComments);
// spaceRouter.post('/:spaceId/book/:bookId/quote/:quoteId/comment', SpaceService.addQuoteComment);
// spaceRouter.patch('/:spaceId/book/:bookId/quote/:quoteId/comment/:commentId', SpaceService.updateQuoteComment);
// spaceRouter.delete('/:spaceId/book/:bookId/quote/:quoteId/comment/:commentId', SpaceService.deleteQuoteComment);

export default spaceRouter;
