import express from 'express';
import SubscriptionController from '../controllers/subscriptionController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/packages', SubscriptionController.getPackages);
router.get('/orders', SubscriptionController.getMyOrders); 
router.get('/orders/:orderId', SubscriptionController.getOrder);
router.post('/subscribe', SubscriptionController.subscribe);
router.post('/pay', SubscriptionController.pay);
router.post('/cancel', SubscriptionController.cancelOrder);

export default router;
