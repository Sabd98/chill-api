import MovieService from '../services/movieService.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';

class MovieController {
  static async getAll(req, res) {
    try {
      const movies = await MovieService.getAllMovies();
      return successResponse(res, 'Movies retrieved successfully', movies);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const movie = await MovieService.getMovieById(id);
      return successResponse(res, 'Movie retrieved successfully', movie);
    } catch (error) {
      if (error.message === 'Movie not found') {
        return errorResponse(res, error.message, 404);
      }
      return errorResponse(res, error.message, 500);
    }
  }
}

export default MovieController;
