import express from 'express';
import UploadController from '../controllers/uploadController.js';
import upload from '../middlewares/uploadMiddleware.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, upload.single('avatar'), UploadController.uploadFile);

export default router;
