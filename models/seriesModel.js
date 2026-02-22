import pool from '../config/db.js';

class SeriesModel {
  static async findAll(params = {}) {
    let query = `
      SELECT s.*, JSON_ARRAYAGG(g.name) as genres
      FROM series s
      LEFT JOIN series_genres sg ON s.id = sg.series_id
      LEFT JOIN genre g ON sg.genre_id = g.id
    `;
    
    const whereConditions = [];
    const queryParams = [];

    if (params.search) {
      whereConditions.push('s.title LIKE ?');
      queryParams.push(`%${params.search}%`);
    }

    if (params.genre) {
      whereConditions.push(`s.id IN (
        SELECT sg2.series_id 
        FROM series_genres sg2 
        JOIN genre g2 ON sg2.genre_id = g2.id 
        WHERE g2.name = ?
      )`);
      queryParams.push(params.genre);
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    query += ' GROUP BY s.id';

    if (params.sortBy) {
      const allowedSorts = ['title', 'id'];
      const sortOrder = params.sortOrder && params.sortOrder.trim().toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      if (allowedSorts.includes(params.sortBy)) {
        query += ` ORDER BY s.${params.sortBy} ${sortOrder}`;
      }
    }

    const [rows] = await pool.query(query, queryParams);
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
