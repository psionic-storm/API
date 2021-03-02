import { Router } from 'express';
import { getCurrentUser, signUpByLoginId } from 'controller/user-controller';
import { validateBody } from 'middlewares/validate-body';
import { decodeJWT } from 'middlewares/decode-jwt';

const userRouter = Router();

type SignUpUserBody = {
  loginId: string;
  password: string;
};

userRouter.get('/', decodeJWT, getCurrentUser);

userRouter.post(
  '/signUp',
  validateBody<SignUpUserBody>(['loginId', 'password']),
  signUpByLoginId,
);

userRouter.post('/signIn', (req, res) => res.json({ ㅗ: 'you' }));

export default userRouter;
