import { Router } from 'express';
import { CategoriesController } from './controller';
import { CategoriesService } from '../services';

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();

    const categoriesService = new CategoriesService();
    const categoriesController = new CategoriesController(categoriesService);

    router.get('/', categoriesController.getCategories);
    router.post('/', categoriesController.createCategory);

    return router;
  }
}
