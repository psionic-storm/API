import { Router } from 'express';
import { getCurrentUser, signUpWithEmail, signInWithEmail, refreshTokens } from 'Service/user-service';
import { validateBody } from 'Middlewares/validate-body';
import { decodeJWT, decodeRefreshJWT } from 'Middlewares/decode-jwt';
import { isSignedIn, isNotSignedIn } from 'Middlewares/auth';
import passport from 'Utils/passport';
import { SignUpUserBody, SignInUserBody } from 'Types/validate-body';

const userRouter = Router();

userRouter.post('/signUp', validateBody<SignUpUserBody>(['email', 'password']), signUpWithEmail);

userRouter.post(
  '/signIn',
  isNotSignedIn,
  validateBody<SignInUserBody>(['email', 'password']),
  passport.authenticate('local', { session: false }),
  signInWithEmail,
);

userRouter.post('/silentRefresh', decodeRefreshJWT, refreshTokens);

userRouter.get('/', decodeJWT, isSignedIn, getCurrentUser);

export default userRouter;
