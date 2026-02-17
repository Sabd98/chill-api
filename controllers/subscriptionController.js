import SubscriptionService from '../services/subscriptionService.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';

class SubscriptionController {
  static async getPackages(req, res) {
    try {
      const packages = await SubscriptionService.getPackages();
      return successResponse(res, 'Packages retrieved successfully', packages);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }

  static async subscribe(req, res) {
    try {
      const userId = req.user.id;
      const { packageId } = req.body;
      
      if (!packageId) {
        return errorResponse(res, 'packageId is required', 400);
      }

      const order = await SubscriptionService.subscribe(userId, packageId);
      return successResponse(res, 'Order created successfully', order, 201);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  static async getMyOrders(req, res) {
    try {
      const userId = req.user.id;
      const orders = await SubscriptionService.getUserOrders(userId);
      return successResponse(res, 'Orders retrieved successfully', orders);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }

  static async getOrder(req, res) {
    try {
      const userId = req.user.id;
      const { orderId } = req.params;
      const order = await SubscriptionService.getOrder(userId, orderId);
      return successResponse(res, 'Order retrieved successfully', order);
    } catch (error) {
      let status = 400;
      if (error.message === 'Order not found') status = 404;
      if (error.message === 'Access denied') status = 403;
      return errorResponse(res, error.message, status);
    }
  }

  static async pay(req, res) {
    try {
      const userId = req.user.id;
      const { orderId, paymentMethod } = req.body;

      if (!orderId || !paymentMethod) {
        return errorResponse(res, 'orderId and paymentMethod are required', 400);
      }

      const result = await SubscriptionService.pay(userId, orderId, paymentMethod);
      return successResponse(res, 'Payment processed successfully', result);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  static async cancelOrder(req, res) {
    try {
      const userId = req.user.id;
      const { orderId } = req.body;

      if (!orderId) {
        return errorResponse(res, 'orderId is required', 400);
      }

      const result = await SubscriptionService.cancelOrder(userId, orderId);
      return successResponse(res, 'Order cancelled successfully', result);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }
}

export default SubscriptionController;
