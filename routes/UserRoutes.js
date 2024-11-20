import express from 'express';
const router = express.Router();
import {
    registerUser,
    loginUser,
    GetProfile,
} from '../controllers/AuthController.js';

import checkUserAuth from '../middlewares/auth-middleware.js';



router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getProfile', checkUserAuth, GetProfile)


export default router