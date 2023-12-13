import { CategoryModel } from '../../data';
import { CustomError, UserEntity } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create.category.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';
import path from 'path';

export class CategoriesService {
  constructor() {}

  public async getCategories() {
    try {
      const categories = await CategoryModel.find().populate({
        path: 'user',
        select: 'name email role',
      });

      return categories;
    } catch (error) {
      throw error;
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
      throw CustomError.internalServer(`${error}`);
    }
  }
}
