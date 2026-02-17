import express from 'express';
import userRoutes from './userRoutes.js';
import movieRoutes from './movieRoutes.js';
import seriesRoutes from './seriesRoutes.js';
import myListRoutes from './myListRoutes.js';
import subscriptionRoutes from './subscriptionRoutes.js';

const router = express.Router();

router.use('/', userRoutes);
router.use('/movies', movieRoutes);
router.use('/series', seriesRoutes);
router.use('/my-list', myListRoutes);
router.use('/subscription', subscriptionRoutes);

export default router;
