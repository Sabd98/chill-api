import SeriesService from '../services/seriesService.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';

class SeriesController {
  static async getAll(req, res) {
    try {
      const series = await SeriesService.getAllSeries();
      return successResponse(res, 'Series retrieved successfully', series);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const series = await SeriesService.getSeriesById(id);
      return successResponse(res, 'Series retrieved successfully', series);
    } catch (error) {
      if (error.message === 'Series not found') {
        return errorResponse(res, error.message, 404);
      }
      return errorResponse(res, error.message, 500);
    }
  }
}

export default SeriesController;
