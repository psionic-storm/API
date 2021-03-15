// import { Router } from 'express';
// import {
//   getCurrentUser,
//   signUpByLoginId,
//   signInByLoginId,
// } from 'src/service/user-service';
// import { validateBody } from 'Middlewares/validate-body';
// import { decodeJWT } from 'Middlewares/decode-jwt';
// import passport from 'Utils/passport';

// const spaceRouter = Router();

// spaceRouter.post(
//   '/signUp',
//   validateBody<SignUpUserBody>(['loginId', 'nickname', 'password']),
//   signUpByLoginId,
// );

// spaceRouter.post(
//   '/signIn',
//   validateBody<SignInUserBody>(['loginId', 'password']),
//   passport.authenticate('local', { session: false }),
//   signInByLoginId,
// );

// spaceRouter.get('/', decodeJWT, getCurrentUser);

// export default spaceRouter;
