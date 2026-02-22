import SeriesModel from '../models/seriesModel.js';

class SeriesService {
  static async getAllSeries(params) {
    return await SeriesModel.findAll(params);
  }

  static async getSeriesById(id) {
    const series = await SeriesModel.findById(id);
    if (!series) {
      throw new Error('Series not found');
    }
    return series;
  }
}

export default SeriesService;
