import pool from '../config/db.js';

class MovieModel {
  static async findAll() {
    const query = `
      SELECT m.*, JSON_ARRAYAGG(g.name) as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genre g ON mg.genre_id = g.id
      GROUP BY m.id
    `;
    const [rows] = await pool.query(query);
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
