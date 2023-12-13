import { CustomError } from '../errors/custom.error';
import { CategoryEntity } from './category.entity';
import { UserEntity } from './user.entity';

export class ProductEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly user: string,
    public readonly category: string,
    public readonly description?: string
  ) {}

  static fromObject(obj: { [key: string]: any }) {
    const { id, _id, name, available, price, user, category, description } =
      obj;

    if (!_id && !id) {
      throw CustomError.badRequest('Missing id');
    }
    if (!name) throw CustomError.badRequest('Missing name');
    if (!price) throw CustomError.badRequest('Missing price');
    if (typeof price !== 'number')
      throw CustomError.badRequest('Price must be a number');
    if (!user) throw CustomError.badRequest('Missing user');
    if (!category) throw CustomError.badRequest('Missing category');

    return new ProductEntity(
      _id || id,
      name,
      available,
      price,
      user,
      category,
      description || ''
    );
  }
}
