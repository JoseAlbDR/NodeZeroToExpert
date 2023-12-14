import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services/file-upload.service';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    const fileUploadServce = new FileUploadService();
    const fileUploadController = new FileUploadController(fileUploadServce);

    router.post('/single/:type', fileUploadController.uploadFile);
    router.post('/multiple/:type', fileUploadController.uploadMultipleFiles);

    return router;
  }
}
