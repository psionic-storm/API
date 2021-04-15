import { Router } from 'express';
import { getCurrentUser, signUpWithEmail, signInWithEmail } from 'src/service/user-service';
import { validateBody } from 'Middlewares/validate-body';
import { decodeJWT } from 'Middlewares/decode-jwt';
import { isSignedIn, isNotSignedIn } from 'Middlewares/auth';
import passport from 'Utils/passport';
import { SignUpUserBody, SignInUserBody } from 'Types/validate-body';

const userRouter = Router();

userRouter.post(
  '/signUp',
  validateBody<SignUpUserBody>(['email', 'password']),
  signUpWithEmail,
);

userRouter.post(
  '/signIn',
  isNotSignedIn,
  validateBody<SignInUserBody>(['email', 'password']),
  passport.authenticate('local', { session: false }),
  signInWithEmail,
);

// userRouter.get(
//   '/signOut',
//   validateBody<SignInUserBody>(['email', 'password']),
//   passport.authenticate('local', { session: false }),
//   signInByLoginId,
// );

userRouter.get('/', decodeJWT, isSignedIn, getCurrentUser);

export default userRouter;
