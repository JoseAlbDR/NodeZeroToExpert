import { Validators, regularExps } from '../../../config';

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string, // ID
    public readonly category: string // ID
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    const {
      name,
      available = false,
      user,
      price,
      description = '',
      category,
    } = props;

    if (!name || name === '') return ['Mising name'];

    let availableBoolean = available;
    if (typeof available !== 'boolean') {
      availableBoolean = available === 'true';
    }

    if (!user) return ['Missing user'];
    if (!Validators.isMongoID(user)) return ['User is not a valid mongoId'];

    if (!category) return ['Missing category'];
    if (!Validators.isMongoID(category))
      return ['Category is not a valid mongoId'];

    if (!price) return ['Missing price'];
    if (isNaN(price)) return ['Price has to be a number'];
    if (price <= 0) return ['Price must be greater than zero'];

    return [
      undefined,
      new CreateProductDto(
        name,
        availableBoolean,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
