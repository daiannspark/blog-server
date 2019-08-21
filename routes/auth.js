import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post('/register', asyncMiddleware(register));
router.post('/login', asyncMiddleware(login));

export default router;