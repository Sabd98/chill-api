import MovieModel from '../models/movieModel.js';

class MovieService {
  static async getAllMovies() {
    return await MovieModel.findAll();
  }

  static async getMovieById(id) {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }
}

export default MovieService;
