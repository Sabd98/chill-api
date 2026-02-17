import pool from '../config/db.js';

class SeriesModel {
  static async findAll() {
    const query = `
      SELECT s.*, JSON_ARRAYAGG(g.name) as genres
      FROM series s
      LEFT JOIN series_genres sg ON s.id = sg.series_id
      LEFT JOIN genre g ON sg.genre_id = g.id
      GROUP BY s.id
    `;
    const [rows] = await pool.query(query);
    return rows;
  }

  static async findById(id) {
    const seriesQuery = `
      SELECT s.*, JSON_ARRAYAGG(g.name) as genres
      FROM series s
      LEFT JOIN series_genres sg ON s.id = sg.series_id
      LEFT JOIN genre g ON sg.genre_id = g.id
      WHERE s.id = ?
      GROUP BY s.id
    `;
    
    const episodesQuery = `
      SELECT * FROM episodes WHERE series_id = ? ORDER BY ep_number ASC
    `;

    const [seriesRows] = await pool.query(seriesQuery, [id]);
    if (seriesRows.length === 0) return null;

    const [episodeRows] = await pool.query(episodesQuery, [id]);

    const series = seriesRows[0];
    series.episodes = episodeRows;

    return series;
  }
}

export default SeriesModel;
