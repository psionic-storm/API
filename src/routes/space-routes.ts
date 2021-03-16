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

export interface AddReviewBody {
  title: string;
  content: string;
}

export type UpdateReviewBody = AddReviewBody;

export interface AddReviewCommentBody {
  comment: string;
}

export type UpdateReviewCommentBody = AddReviewCommentBody;

export interface AddQuoteBody {
  content: string;
  page: number;
}

export type UpdateQuoteBody = AddQuoteBody;

export interface AddQuoteCommentBody {
  comment: string;
}

export type UpdateQuoteCommentBody = AddQuoteCommentBody;

spaceRouter.get('/:spaceId/book/:bookId', SpaceService.getBook);
spaceRouter.post(
  '/:spaceId/book',
  decodeJWT,
  checkPermission,
  validateBody<AddBookBody>(['title', 'author', 'description']),
  SpaceService.addBook,
);
spaceRouter.delete('/:spaceId/book/:bookId', decodeJWT, checkPermission, SpaceService.deleteBook);

spaceRouter.post(
  '/:spaceId/book/:bookId/review',
  decodeJWT,
  checkPermission,
  validateBody<AddReviewBody>(['title', 'content']),
  SpaceService.addReview,
);
spaceRouter.patch(
  '/:spaceId/book/:bookId/review/:reviewId',
  decodeJWT,
  checkPermission,
  validateBody<UpdateReviewBody>(['title', 'content']),
  SpaceService.updateReview,
);
spaceRouter.delete('/:spaceId/book/:bookId/review/:reviewId', decodeJWT, checkPermission, SpaceService.deleteReview);

spaceRouter.get('/:spaceId/book/:bookId/review/:reviewId/comment', SpaceService.getAllReviewComments);
spaceRouter.post(
  '/:spaceId/book/:bookId/review/:reviewId/comment',
  decodeJWT,
  validateBody<AddReviewCommentBody>(['comment']),
  SpaceService.addReviewComment,
);
spaceRouter.patch(
  '/:spaceId/book/:bookId/review/:reviewId/comment/:commentId',
  decodeJWT,
  checkPermission,
  validateBody<UpdateReviewCommentBody>(['comment']),
  SpaceService.updateReviewComment,
);
spaceRouter.delete(
  '/:spaceId/book/:bookId/review/:reviewId/comment/:commentId',
  decodeJWT,
  checkPermission,
  SpaceService.deleteReviewComment,
);

spaceRouter.post(
  '/:spaceId/book/:bookId/quote',
  decodeJWT,
  checkPermission,
  validateBody<AddQuoteBody>(['content', 'page']),
  SpaceService.addQuote,
);
spaceRouter.patch(
  '/:spaceId/book/:bookId/quote/:quoteId',
  decodeJWT,
  checkPermission,
  validateBody<UpdateQuoteBody>(['content', 'page']),
  SpaceService.updateQuote,
);
spaceRouter.delete('/:spaceId/book/:bookId/quote/:quoteId', decodeJWT, checkPermission, SpaceService.deleteQuote);

spaceRouter.get('/:spaceId/book/:bookId/quote/:quoteId/comment', SpaceService.getAllQuoteComments);
spaceRouter.post(
  '/:spaceId/book/:bookId/quote/:quoteId/comment',
  decodeJWT,
  validateBody<AddQuoteCommentBody>(['comment']),
  SpaceService.addQuoteComment,
);
spaceRouter.patch(
  '/:spaceId/book/:bookId/quote/:quoteId/comment/:commentId',
  decodeJWT,
  checkPermission,
  validateBody<UpdateQuoteCommentBody>(['comment']),
  SpaceService.updateQuoteComment,
);
spaceRouter.delete(
  '/:spaceId/book/:bookId/quote/:quoteId/comment/:commentId',
  decodeJWT,
  checkPermission,
  SpaceService.deleteQuoteComment,
);

export default spaceRouter;
