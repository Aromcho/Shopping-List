import express from 'express';
import shopListRouter from './api/shopList.routes.js';
import usersRouter from './api/users.routes.js';
import authRouter from './api/auth.routes.js';

const router = express.Router();

router.use('/shoplist', shopListRouter);

router.use('/users',usersRouter );

router.use('/auth', authRouter);

export default router;