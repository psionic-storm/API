import { Router } from 'express';

const spaceRouter = Router();

spaceRouter.get('/:spaceId', getSpace);
spaceRouter.patch('/:spaceId', updateSpace);

spaceRouter.get('/:spaceId/book/:bookId', getSpace);
spaceRouter.post('/:spaceId/book', getSpace);
spaceRouter.delete('/:spaceId/book/:bookId', getSpace);

spaceRouter.post('/:spaceId/book/:bookId/review', getSpace);
spaceRouter.patch('/:spaceId/book/:bookId/review/:reviewId', getSpace);
spaceRouter.delete('/:spaceId/book/:bookId/review/:reviewId', getSpace);

spaceRouter.get('/:spaceId/book/:bookId/review/:reviewId/comment', getSpace);
spaceRouter.post('/:spaceId/book/:bookId/review/:reviewId/comment', getSpace);
spaceRouter.patch('/:spaceId/book/:bookId/review/:reviewId/comment/:commentId', getSpace);
spaceRouter.delete('/:spaceId/book/:bookId/review/:reviewId/comment/:commentId', getSpace);

spaceRouter.post('/:spaceId/book/:bookId/quote', getSpace);
spaceRouter.patch('/:spaceId/book/:bookId/quote/:quoteId', getSpace);
spaceRouter.delete('/:spaceId/book/:bookId/quote/:quoteId', getSpace);

spaceRouter.get('/:spaceId/book/:bookId/quote/:quoteId/comment', getSpace);
spaceRouter.post('/:spaceId/book/:bookId/quote/:quoteId/comment', getSpace);
spaceRouter.patch('/:spaceId/book/:bookId/quote/:quoteId/comment/:commentId', getSpace);
spaceRouter.delete('/:spaceId/book/:bookId/quote/:quoteId/comment/:commentId', getSpace);

export default spaceRouter;
