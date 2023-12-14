import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    const fileUploadService = new FileUploadService();
    const fileUploadController = new FileUploadController(fileUploadService);

    router.use([
      FileUploadMiddleware.containFiles,
      FileUploadMiddleware.validateType(['users', 'products', 'categories']),
      FileUploadMiddleware.validateExtension([
        'png',
        'jpg',
        'jpeg',
        'gif',
        'webp',
      ]),
    ]);

    router.post('/single/:type', fileUploadController.uploadFile);
    router.post('/multiple/:type', fileUploadController.uploadMultipleFiles);

    return router;
  }
}
