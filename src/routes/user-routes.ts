import { Router } from 'express';
import { getCurrentUser, signUpWithEmail, signInWithEmail } from 'src/service/user-service';
import { validateBody } from 'Middlewares/validate-body';
import { decodeJWT } from 'Middlewares/decode-jwt';
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

userRouter.get('/', decodeJWT, getCurrentUser);

export default userRouter;
