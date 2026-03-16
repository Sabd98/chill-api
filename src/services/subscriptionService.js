import PackageModel from '../models/packageModel.js';
import OrderModel from '../models/orderModel.js';
import PaymentModel from '../models/paymentModel.js';
import { v4 as uuidv4 } from 'uuid';

class SubscriptionService {
  static async getPackages() {
    return await PackageModel.findAll();
  }

  static async subscribe(userId, packageId) {
    const pkg = await PackageModel.findById(packageId);
    if (!pkg) throw new Error('Package not found');

    const orderId = uuidv4();
    const orderNum = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    return await OrderModel.create(orderId, userId, packageId, orderNum, pkg.price);
  }

  static async getUserOrders(userId) {
    return await OrderModel.findByUserId(userId);
  }

  static async getOrder(userId, orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.user_id !== userId) throw new Error('Access denied');
    return order;
  }

  static async pay(userId, orderId, paymentMethod) {
    const order = await OrderModel.findById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.user_id !== userId) throw new Error('Access denied');
    if (order.status === 'PAID') throw new Error('Order already paid');

    const paymentId = uuidv4();
    const paymentStatus = 'SUCCESS';

    
    await PaymentModel.create(paymentId, orderId, paymentMethod, order.total_price, paymentStatus);
    await OrderModel.updateStatus(orderId, 'PAID');

    return { message: 'Payment successful', orderId, paymentStatus };
  }

  static async cancelOrder(userId, orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.user_id !== userId) throw new Error('Access denied');
    if (order.status === 'PAID') throw new Error('Order already paid');

    await OrderModel.updateStatus(orderId, 'FAILED');
    return { message: 'Order cancelled successfully' };
  }
}

export default SubscriptionService;
