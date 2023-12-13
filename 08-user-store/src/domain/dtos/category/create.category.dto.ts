import { UserEntity } from '../../entities/user.entity';

export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly user: UserEntity
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available, user } = object;

    if (!name || name === '') return ['Mising name'];
    if (!user || !(user instanceof UserEntity)) return ['Mismatching user'];

    return [undefined, new CreateCategoryDto(name, available, user)];
  }
}
