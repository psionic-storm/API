import { Router } from 'express';

const router = Router();

router.use('/user', (req, res) => res.send('ggg'));

export default router;
