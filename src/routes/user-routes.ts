import { Router } from 'express';
import {
  getCurrentUser,
  signUpByLoginId,
  signInByLoginId,
} from 'controller/user-controller';
import { validateBody } from 'middlewares/validate-body';
import { decodeJWT } from 'middlewares/decode-jwt';
import passport from 'utils/passport';

const userRouter = Router();

interface SignUpUserBody {
  loginId: string;
  nickname: string;
  password: string;
}

interface SignInUserBody {
  loginId: string;
  password: string;
}

userRouter.post(
  '/signUp',
  validateBody<SignUpUserBody>(['loginId', 'nickname', 'password']),
  signUpByLoginId,
);

userRouter.post(
  '/signIn',
  validateBody<SignInUserBody>(['loginId', 'password']),
  passport.authenticate('local', { session: false }),
  signInByLoginId,
);

userRouter.get('/', decodeJWT, getCurrentUser);

export default userRouter;
