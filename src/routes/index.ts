import { Router } from 'express';
import userRouter from 'Routes/user-routes';
import squareRouter from 'Routes/square-routes';
import spaceRouter from 'Routes/space-routes';
// import salonRouter from 'Routes/salon-routes';

const router = Router();

router.use('/user', userRouter);
router.use('/square', squareRouter);
router.use('/space', spaceRouter);
// router.use('/salon', salonRouter);

export default router;
