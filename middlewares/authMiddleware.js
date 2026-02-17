import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responseHelper.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return errorResponse(res, 'Access denied. No token provided.', 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return errorResponse(res, 'Invalid token.', 403);
    }
    req.user = user;
    next();
  });
};
