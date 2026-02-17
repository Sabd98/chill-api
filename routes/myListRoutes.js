import express from 'express';
import MyListController from '../controllers/myListController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', MyListController.getMyList);
router.post('/', MyListController.addToList);
router.delete('/', MyListController.removeFromList);

export default router;
