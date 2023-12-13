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
      const categories = await CategoryModel.find().limit(limit).skip(page);

      const categoryEntities = categories.map((category) =>
        CategoryEntity.fromObject(category)
      );

      return categoryEntities;
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
