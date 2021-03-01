import { Router } from 'express';
import { createUser } from 'controller/user-controller';

const userRouter = Router();

userRouter.post('/signUp', createUser);
userRouter.post('/signIn', (req, res) => res.json({ ㅗ: 'you' }));

export default userRouter;
