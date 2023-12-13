import { Request, Response } from 'express';
import { CustomError, PaginationDto } from '../../domain';
import { ProductsService } from '../services';

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  getProducts = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return this.handleError(CustomError.badRequest(error), res);

    this.productsService
      .getProducts(paginationDto!)
      .then((products) => res.json(products))
      .catch((err) => this.handleError(err, res));
  };

  createProduct = (req: Request, res: Response) => {
    this.productsService
      .createProduct()
      .then((product) => res.json(product))
      .catch((err) => this.handleError(err, res));
  };
}
