import { CustomError } from '../errors/custom.error';
import { UserEntity } from './user.entity';

export class CategoryEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly available: boolean,
    public readonly user: UserEntity
  ) {}

  static fromObject(obj: { [key: string]: any }) {
    const { id, _id, name, available, user } = obj;

    if (!_id && !id) throw CustomError.badRequest('Missing id');

    if (!name) throw CustomError.badRequest('Missing name');
    if (typeof available !== 'boolean')
      throw CustomError.badRequest('Available must be boolean');
    if (!user) throw CustomError.badRequest('User is required');
    if (!(user instanceof UserEntity))
      throw CustomError.badRequest('User must be an instance of UserEntity');

    return new CategoryEntity(_id || id, name, available, user);
  }
}
