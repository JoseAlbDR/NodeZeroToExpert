import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    const fileUploadServce = new FileUploadService();
    const fileUploadController = new FileUploadController(fileUploadServce);

    router.post(
      '/single/:type',
      [FileUploadMiddleware.containFiles, FileUploadMiddleware.validateType],
      fileUploadController.uploadFile
    );
    router.post(
      '/multiple/:type',
      [FileUploadMiddleware.containFiles, FileUploadMiddleware.validateType],
      fileUploadController.uploadMultipleFiles
    );

    return router;
  }
}
