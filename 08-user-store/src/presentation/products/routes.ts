import { Router } from 'express';
import { ProductsService } from '../services';
import { ProductsController } from './controller';

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const productsService = new ProductsService();
    const productController = new ProductsController(productsService);

    router.get('/', productController.getProducts);
    router.post('/', productController.createProduct);

    return router;
  }
}
