import MyListModel from '../models/myListModel.js';
import { v4 as uuidv4 } from 'uuid';

class MyListService {
  static async getMyList(userId, params) {
    return await MyListModel.findByUserId(userId, params);
  }

  static async addToList(userId, contentId, type) {
    const id = uuidv4();
    return await MyListModel.add(id, userId, contentId, type);
  }

  static async removeFromList(userId, contentId, type) {
    const success = await MyListModel.remove(userId, contentId, type);
    if (!success) {
      throw new Error('Item not found in My List');
    }
    return success;
  }
}

export default MyListService;
