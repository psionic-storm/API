import { Router } from 'express';
import {
  getCurrentUser,
  signUpByLoginId,
  signInByLoginId,
} from 'Controller/user-controller';
import { validateBody } from 'Middlewares/validate-body';
import { decodeJWT } from 'Middlewares/decode-jwt';
import passport from 'Utils/passport';

const salonRouter = Router();

salonRouter.post(
  '/signUp',
  validateBody<SignUpUserBody>(['loginId', 'nickname', 'password']),
  signUpByLoginId,
);

salonRouter.post(
  '/signIn',
  validateBody<SignInUserBody>(['loginId', 'password']),
  passport.authenticate('local', { session: false }),
  signInByLoginId,
);

salonRouter.get('/', decodeJWT, getCurrentUser);

export default salonRouter;
