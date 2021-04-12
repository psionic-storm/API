import { Router } from 'express';
import SquareService from 'Service/square-service';

const squareRouter = Router();
squareRouter.get('/reviews', SquareService.getAllReviews);
squareRouter.get('/quotes', SquareService.getAllQuotes);

export default squareRouter;
