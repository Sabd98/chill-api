import pool from '../config/db.js';

class MyListModel {
  static async findByUserId(userId, params = {}) {
    let query = `
      SELECT ml.id as my_list_id, ml.user_id,
             m.id as movie_id, m.title as movie_title, m.image_url as movie_image,
             s.id as series_id, s.title as series_title, s.image_url as series_image
      FROM my_list ml
      LEFT JOIN movies m ON ml.movies_id = m.id
      LEFT JOIN series s ON ml.series_id = s.id
      WHERE ml.user_id = ?
    `;
    const queryParams = [userId];

    if (params.search) {
      query += ` AND (m.title LIKE ? OR s.title LIKE ?)`;
      queryParams.push(`%${params.search}%`, `%${params.search}%`);
    }

    if (params.genre) {
      query += ` AND (
        (ml.movies_id IS NOT NULL AND ml.movies_id IN (
           SELECT mg.movie_id FROM movie_genres mg JOIN genre g ON mg.genre_id = g.id WHERE g.name = ?
        ))
        OR 
        (ml.series_id IS NOT NULL AND ml.series_id IN (
           SELECT sg.series_id FROM series_genres sg JOIN genre g ON sg.genre_id = g.id WHERE g.name = ?
        ))
      )`;
      queryParams.push(params.genre, params.genre);
    }

    const sortOrder = params.sortOrder && params.sortOrder.trim().toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    if (params.sortBy === 'title') {
      query += ` ORDER BY COALESCE(m.title, s.title) ${sortOrder}`;
    } 

    const [rows] = await pool.query(query, queryParams);
    return rows;
  }

  static async add(id, userId, contentId, type) {
    let query = '';
    let params = [];

    if (type === 'movie') {
      const [existing] = await pool.query(
        'SELECT * FROM my_list WHERE user_id = ? AND movies_id = ?', 
        [userId, contentId]
      );
      if (existing.length > 0) return existing[0];

      query = 'INSERT INTO my_list (id, user_id, movies_id) VALUES (?, ?, ?)';
      params = [id, userId, contentId];

    } else if (type === 'series') {
      const [existing] = await pool.query(
        'SELECT * FROM my_list WHERE user_id = ? AND series_id = ?', 
        [userId, contentId]
      );
      if (existing.length > 0) return existing[0];

      query = 'INSERT INTO my_list (id, user_id, series_id) VALUES (?, ?, ?)';
      params = [id, userId, contentId];
    } else {
      throw new Error('Invalid type. Must be "movie" or "series".');
    }

    await pool.query(query, params);
    return { id, userId, contentId, type };
  }

  static async remove(userId, contentId, type) {
    let query = '';
    if (type === 'movie') {
      query = 'DELETE FROM my_list WHERE user_id = ? AND movies_id = ?';
    } else if (type === 'series') {
      query = 'DELETE FROM my_list WHERE user_id = ? AND series_id = ?';
    } else {
      throw new Error('Invalid type. Must be "movie" or "series".');
    }
    
    const [result] = await pool.query(query, [userId, contentId]);
    return result.affectedRows > 0;
  }
}

export default MyListModel;
