import { CreateCategoryDto } from '../../domain/dtos/category/create.category.dto';

export class CategoriesService {
  constructor() {}

  public async getCategories() {
    return 'Get Categories';
  }

  public async createCategory(createCategoryDto: CreateCategoryDto) {
    return createCategoryDto;
  }
}
