import MyListService from '../services/myListService.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';

class MyListController {
  static async getMyList(req, res) {
    try {
      const userId = req.user.id;
      const list = await MyListService.getMyList(userId);
      return successResponse(res, 'My List retrieved successfully', list);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }

  static async addToList(req, res) {
    try {
      const userId = req.user.id;
      const { contentId, type } = req.body;
      
      if (!contentId || !type) {
        return errorResponse(res, 'contentId and type are required', 400);
      }

      const result = await MyListService.addToList(userId, contentId, type);
      return successResponse(res, 'Added to My List successfully', result, 201);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }

  static async removeFromList(req, res) {
    try {
      const userId = req.user.id;
      const { contentId, type } = req.body;

      if (!contentId || !type) {
        return errorResponse(res, 'contentId and type are required', 400);
      }

      await MyListService.removeFromList(userId, contentId, type);
      return successResponse(res, 'Removed from My List successfully');
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }
}

export default MyListController;
