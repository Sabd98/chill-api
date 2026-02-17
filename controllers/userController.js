import UserService from '../services/userService.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';

class UserController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return errorResponse(res, 'Username and password are required', 400);
      }

      const user = await UserService.register(username, password);
      return successResponse(res, 'User registered successfully', user, 201);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return errorResponse(res, 'Username and password are required', 400);
      }

      const data = await UserService.login(username, password);
      return successResponse(res, 'Login successful', data);
    } catch (error) {
      return errorResponse(res, error.message, 401);
    }
  }

  static async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserService.getProfile(userId);
      return successResponse(res, 'Profile retrieved successfully', user);
    } catch (error) {
      return errorResponse(res, error.message, 404);
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const data = req.body;
      const updatedUser = await UserService.updateProfile(userId, data);
      return successResponse(res, 'Profile updated successfully', updatedUser);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }
}

export default UserController;
