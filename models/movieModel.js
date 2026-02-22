import pool from '../config/db.js';

class MovieModel {
  static async findAll(params = {}) {
    let query = `
      SELECT m.*, JSON_ARRAYAGG(g.name) as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genre g ON mg.genre_id = g.id
    `;
    
    const whereConditions = [];
    const queryParams = [];

    if (params.search) {
      whereConditions.push('m.title LIKE ?');
      queryParams.push(`%${params.search}%`);
    }

    if (params.genre) {
      whereConditions.push(`m.id IN (
        SELECT mg2.movie_id 
        FROM movie_genres mg2 
        JOIN genre g2 ON mg2.genre_id = g2.id 
        WHERE g2.name = ?
      )`);
      queryParams.push(params.genre);
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    query += ' GROUP BY m.id';

    if (params.sortBy) {
      const allowedSorts = ['title', 'id'];
      const sortOrder = params.sortOrder && params.sortOrder.trim().toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      if (allowedSorts.includes(params.sortBy)) {
        query += ` ORDER BY m.${params.sortBy} ${sortOrder}`;
      }
    }

    const [rows] = await pool.query(query, queryParams);
    return rows;
  }

  static async findById(id) {
    const query = `
      SELECT m.*, JSON_ARRAYAGG(g.name) as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genre g ON mg.genre_id = g.id
      WHERE m.id = ?
      GROUP BY m.id
    `;
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  }
}

export default MovieModel;
