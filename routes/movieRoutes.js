import express from 'express';
import MovieController from '../controllers/movieController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken); 

router.get('/', MovieController.getAll);
router.get('/:id', MovieController.getById);

export default router;
