import { Validators, regularExps } from '../../../config';
import { UserEntity } from '../../entities/user.entity';

export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly user: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false, user } = object;

    let availableBoolean = available;

    if (!name || name === '') return ['Mising name'];
    if (!user) return ['Missing user'];
    if (typeof available !== 'boolean') {
      availableBoolean = available === 'true';
    }
    if (!Validators.isMongoID(user)) return ['User is not a valid mongoId'];

    return [undefined, new CreateCategoryDto(name, availableBoolean, user)];
  }
}
