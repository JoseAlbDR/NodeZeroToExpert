import { Router } from 'express';
import { CategoriesController } from './controller';
import { CategoriesService } from '../services';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();

    const categoriesService = new CategoriesService();
    const categoriesController = new CategoriesController(categoriesService);

    router.get('/', categoriesController.getCategories);
    router.post(
      '/',
      [AuthMiddleware.validateJWT],
      categoriesController.createCategory
    );

    return router;
  }
}
