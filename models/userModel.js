import pool from '../config/db.js';

class UserModel {
  static async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM user WHERE username = ?', [username]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
    return rows[0];
  }
  

  static async create(id, username, password, email, fullname) {
    const query = 'INSERT INTO user (id, username, password, email, fullname, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
    await pool.query(query, [id, username, password, email, fullname]);
    return { id, username, email, fullname };
  }

  static async update(id, data) {
    const fields = [];
    const values = [];

    if (data.username) {
      fields.push('username = ?');
      values.push(data.username);
    }

    if (data.email) {
      fields.push('email = ?');
      values.push(data.email);
    }

    if (data.fullname) {
      fields.push('fullname = ?');
      values.push(data.fullname);
    }

    if (data.avatar) {
      fields.push('avatar = ?');
      values.push(data.avatar);
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE user SET ${fields.join(', ')} WHERE id = ?`;
    
    await pool.query(query, values);
    return await this.findById(id);
  }
}

export default UserModel;
