import { Router } from 'express';
import userRouter from 'routes/user';

const router = Router();

router.use('/user', userRouter);

export default router;
