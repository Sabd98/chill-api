import express from 'express';
import SeriesController from '../controllers/seriesController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', SeriesController.getAll);
router.get('/:id', SeriesController.getById);

export default router;
