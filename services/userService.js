import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/userModel.js';
import EmailService from './emailService.js';
import pool from '../config/db.js';

class UserService {
  static async register(username, password, email, fullname) {
    const existingUser = await UserModel.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    if (email) {
      const existingEmail = await UserModel.findByEmail(email);
      if (existingEmail) {
        throw new Error('Email already exists');
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const verificationToken = uuidv4();
    
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const newUser = await UserModel.create(userId, username, hashedPassword, email, fullname, verificationToken, connection);
      
      // Send verification email
      if (email) {
        await EmailService.sendVerificationEmail(email, verificationToken);
      }

      await connection.commit();
      return newUser;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async verifyEmail(token) {
    const user = await UserModel.findByVerificationToken(token);
    if (!user) {
      throw new Error('Invalid Verification Token');
    }
    
    await UserModel.verifyUser(user.id);
    return true;
  }

  static async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return { token, user: { id: user.id, username: user.username, email: user.email } };
  }

  static async getProfile(userId) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');
    delete user.password; 
    return user;
  }

  static async updateProfile(userId, data) {
    const updatedUser = await UserModel.update(userId, data);
    if (!updatedUser) throw new Error('Update failed or no changes provided');
    delete updatedUser.password;
    return updatedUser;
  }
}

export default UserService;
