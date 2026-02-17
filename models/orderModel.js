import pool from '../config/db.js';

class OrderModel {
  static async create(id, userId, packageId, orderNum, totalPrice) {
    const query = 'INSERT INTO `order` (id, user_id, package_id, order_num, total_price, status, created_at) VALUES (?, ?, ?, ?, ?, "PENDING", NOW())';
    await pool.query(query, [id, userId, packageId, orderNum, totalPrice]);
    return { id, userId, packageId, orderNum, totalPrice, status: 'PENDING' };
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM `order` WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM `order` WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
  }

  static async updateStatus(id, status) {
    const query = 'UPDATE `order` SET status = ? WHERE id = ?';
    await pool.query(query, [status, id]);
    return { id, status };
  }
}

export default OrderModel;
