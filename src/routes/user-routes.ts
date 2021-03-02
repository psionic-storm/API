import { Router } from 'express';
import { getCurrentUser, signUpByLoginId } from 'controller/user-controller';
import { validateBody } from 'middlewares/validate-body';
import { decodeJWT } from 'middlewares/decode-jwt';
import passport from 'utils/passport';

const userRouter = Router();

type SignUpUserBody = {
  loginId: string;
  password: string;
};

type SignInUserBody = SignUpUserBody;

userRouter.post(
  '/signUp',
  validateBody<SignUpUserBody>(['loginId', 'password']),
  signUpByLoginId,
);

userRouter.post(
  '/signIn',
  validateBody<SignInUserBody>(['loginId', 'password']),
  passport.authenticate('local', { session: false }),
  signInByUserId,
);

userRouter.get('/', decodeJWT, getCurrentUser);

export default userRouter;
