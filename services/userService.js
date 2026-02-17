import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/userModel.js';

class UserService {
  static async register(username, password) {
    const existingUser = await UserModel.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    
    const newUser = await UserModel.create(userId, username, hashedPassword);
    return newUser;
  }

  static async login(username, password) {
    const user = await UserModel.findByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return { token, user: { id: user.id, username: user.username } };
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
