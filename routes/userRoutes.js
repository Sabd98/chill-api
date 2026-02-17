import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(authenticateToken);
router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);

export default router;
