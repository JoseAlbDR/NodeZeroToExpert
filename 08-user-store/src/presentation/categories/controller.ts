import { Request, Response } from 'express';
import { CategoriesService } from '../services';
import { CustomError } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create.category.dto';

export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createCategory = (req: Request, res: Response) => {
    const {
      name,
      available,
      user: { id: userId },
    } = req.body;

    const [error, createCategoryDto] = CreateCategoryDto.create({
      name,
      available,
      user: userId,
    });

    if (error) return res.status(400).json({ error });

    this.categoriesService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleError(error, res));
  };

  getCategories = (req: Request, res: Response) => {
    this.categoriesService
      .getCategories()
      .then((categories) => res.status(200).json(categories))
      .catch((error) => this.handleError(error, res));
  };
}
