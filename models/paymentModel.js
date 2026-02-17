import pool from '../config/db.js';

class PaymentModel {
  static async create(id, orderId, paymentMethod, amount, paymentStatus) {
    const query = 'INSERT INTO payment (id, order_id, payment_method, amount, payment_date, payment_status) VALUES (?, ?, ?, ?, NOW(), ?)';
    await pool.query(query, [id, orderId, paymentMethod, amount, paymentStatus]);
    return { id, orderId, paymentMethod, amount, paymentStatus };
  }
}

export default PaymentModel;
