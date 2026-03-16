import { successResponse, errorResponse } from '../utils/responseHelper.js';

class UploadController {
  static async uploadFile(req, res) {
    try {
      if (!req.file) {
        return errorResponse(res, 'No file uploaded', 400);
      }

      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      return successResponse(res, 'File uploaded successfully', {
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      });
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }
}

export default UploadController;
