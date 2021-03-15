import { Router } from 'express';
import { getAllReviews, getAllQuotes } from 'src/service/square-service';

const squareRouter = Router();
squareRouter.get('/reviews', getAllReviews);
squareRouter.get('/quotes', getAllQuotes);

export default squareRouter;
