import pool from '../config/db.js';

class PackageModel {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM package');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM package WHERE id = ?', [id]);
    return rows[0];
  }
}

export default PackageModel;
