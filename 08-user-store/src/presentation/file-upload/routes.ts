import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    const fileUploadController = new FileUploadController();

    router.post('/single', fileUploadController.uploadFile);
    router.post('/multiple', fileUploadController.uploadMultipleFiles);

    return router;
  }
}
