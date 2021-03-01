import { Router } from 'express';

const userRouter = Router();

userRouter.post('/signUp', (req, res) => res.json({ fuck: 'you' }));
userRouter.post('/signIn', (req, res) => res.json({ ㅗ: 'you' }));

export default userRouter;
