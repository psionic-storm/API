import { Router } from 'express';
import {
  getCurrentUser,
  signUpByLoginId,
  signInByLoginId,
} from 'Controller/user-controller';
import { validateBody } from 'Middlewares/validate-body';

const squareRouter = Router();
squareRouter.get('/', getCurrentUser);

export default squareRouter;
