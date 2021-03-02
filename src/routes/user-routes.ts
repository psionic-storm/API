import { Router } from 'express';
import { createUser, getCurrentUser } from 'controller/user-controller';

const userRouter = Router();

userRouter.get('/', getCurrentUser);
userRouter.post('/signUp', createUser);
userRouter.post('/signIn', (req, res) => res.json({ ㅗ: 'you' }));

export default userRouter;
