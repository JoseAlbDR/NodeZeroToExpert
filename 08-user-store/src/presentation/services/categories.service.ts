import { CategoryModel } from '../../data';
import { CustomError, PaginationDto, UserEntity } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create.category.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';
import path from 'path';

export class CategoriesService {
  constructor() {}

  public async getCategories(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      // const total = await CategoryModel.countDocuments();
      // const categories = await CategoryModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit);

      const maxPages = Math.ceil(total / limit);

      const categoryEntities = categories.map((category) =>
        CategoryEntity.fromObject(category)
      );

      return {
        currentPage: page,
        maxPages,
        limit: limit,
        total,
        next:
          page + 1 <= maxPages
            ? `/api/v1/categories?page=${page + 1}&limit=${limit}`
            : null,
        prev:
          page - 1 > 0
            ? `/api/v1/categories?page=${page - 1}&limit=${limit}`
            : null,
        categories: categoryEntities,
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ) {
    const categoryExist = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (categoryExist) throw CustomError.badRequest('Category already exists');

    try {
      const category = await CategoryModel.create({
        ...createCategoryDto,
        user: user.id,
      });

      const categoryEntity = CategoryEntity.fromObject(category);
      return categoryEntity;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}
