import { Router } from 'express';
import SalonService from 'Service/salon-service';
import { validateBody } from 'Middlewares/validate-body';
import { decodeJWT } from 'Middlewares/decode-jwt';
import { checkPermission } from 'Middlewares/check-permission';

const salonRouter = Router();

export interface CreateSalonBody {
  name: string;
}

export type UpdateSalonBody = CreateSalonBody;

salonRouter.post('/', decodeJWT, SalonService.addSalon);

salonRouter.get('/:salonId', SalonService.getSalon);
salonRouter.patch(
  '/:salonId',
  decodeJWT,
  checkPermission,
  validateBody<UpdateSalonBody>(['name']),
  SalonService.updateSalon,
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

salonRouter.get('/:salonId/book/:bookId', SalonService.getBook);
salonRouter.post(
  '/:salonId/book',
  decodeJWT,
  checkPermission,
  validateBody<AddBookBody>(['title', 'author', 'description']),
  SalonService.addBook,
);
salonRouter.delete('/:salonId/book/:bookId', decodeJWT, checkPermission, SalonService.deleteBook);

salonRouter.post(
  '/:salonId/book/:bookId/review',
  decodeJWT,
  checkPermission,
  validateBody<AddReviewBody>(['title', 'content']),
  SalonService.addReview,
);
salonRouter.patch(
  '/:salonId/book/:bookId/review/:reviewId',
  decodeJWT,
  checkPermission,
  validateBody<UpdateReviewBody>(['title', 'content']),
  SalonService.updateReview,
);
salonRouter.delete('/:salonId/book/:bookId/review/:reviewId', decodeJWT, checkPermission, SalonService.deleteReview);

salonRouter.get('/:salonId/book/:bookId/review/:reviewId/comment', SalonService.getAllReviewComments);
salonRouter.post(
  '/:salonId/book/:bookId/review/:reviewId/comment',
  decodeJWT,
  validateBody<AddReviewCommentBody>(['comment']),
  SalonService.addReviewComment,
);
salonRouter.patch(
  '/:salonId/book/:bookId/review/:reviewId/comment/:commentId',
  decodeJWT,
  checkPermission,
  validateBody<UpdateReviewCommentBody>(['comment']),
  SalonService.updateReviewComment,
);
salonRouter.delete(
  '/:salonId/book/:bookId/review/:reviewId/comment/:commentId',
  decodeJWT,
  checkPermission,
  SalonService.deleteReviewComment,
);

salonRouter.post(
  '/:salonId/book/:bookId/quote',
  decodeJWT,
  checkPermission,
  validateBody<AddQuoteBody>(['content', 'page']),
  SalonService.addQuote,
);
salonRouter.patch(
  '/:salonId/book/:bookId/quote/:quoteId',
  decodeJWT,
  checkPermission,
  validateBody<UpdateQuoteBody>(['content', 'page']),
  SalonService.updateQuote,
);
salonRouter.delete('/:salonId/book/:bookId/quote/:quoteId', decodeJWT, checkPermission, SalonService.deleteQuote);

salonRouter.get('/:salonId/book/:bookId/quote/:quoteId/comment', SalonService.getAllQuoteComments);
salonRouter.post(
  '/:salonId/book/:bookId/quote/:quoteId/comment',
  decodeJWT,
  validateBody<AddQuoteCommentBody>(['comment']),
  SalonService.addQuoteComment,
);
salonRouter.patch(
  '/:salonId/book/:bookId/quote/:quoteId/comment/:commentId',
  decodeJWT,
  checkPermission,
  validateBody<UpdateQuoteCommentBody>(['comment']),
  SalonService.updateQuoteComment,
);
salonRouter.delete(
  '/:salonId/book/:bookId/quote/:quoteId/comment/:commentId',
  decodeJWT,
  checkPermission,
  SalonService.deleteQuoteComment,
);

export default salonRouter;
