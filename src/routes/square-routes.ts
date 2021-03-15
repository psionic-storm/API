import { Router } from 'express';
import SquareService from 'src/service/square-service';

const squareRouter = Router();
squareRouter.get('/reviews', SquareService.getAllReviews);
squareRouter.get('/quotes', SquareService.getAllQuotes);

export default squareRouter;
