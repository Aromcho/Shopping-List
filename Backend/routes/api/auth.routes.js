import express from 'express';
import { register, login, logout, profile } from '../../controllers/auth.controller.js';
import {authRequired} from '../../middlewares/validateToken.mid.js';
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/profile', authRequired, profile);

export default authRouter;