import { Router } from 'express';
import { ProductsService } from '../services';
import { ProductsController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const productsService = new ProductsService();
    const productController = new ProductsController(productsService);

    router.get('/', productController.getProducts);
    router.post(
      '/',
      [AuthMiddleware.validateJWT],
      productController.createProduct
    );

    return router;
  }
}
