import { ProductModel } from '../../data';
import {
  CreateProductDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from '../../domain';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';

export class ProductsService {
  constructor() {}

  public async getProducts(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate({ path: 'user' })
          .populate({ path: 'category' }),
      ]);

      const maxPages = Math.ceil(total / limit);

      const productEntities = products.map((product) => {
        const user = UserEntity.fromObject(product.user);
        const { password, ...userNoPass } = user;
        return ProductEntity.fromObject({
          name: product.name,
          price: product.price,
          id: product._id,
          description: product.description,
          user: userNoPass,
          category: CategoryEntity.fromObject(product.category),
        });
      });

      return {
        currentPage: page,
        maxPages,
        limit,
        total,
        next:
          page + 1 <= maxPages
            ? `/api/v1/products?page=${page + 1}&limit=${limit}`
            : null,
        prev:
          page - 1 > 0
            ? `/api/v1/products?page=${page - 1}&limit=${limit}`
            : null,
        products: productEntities,
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }

  public async createProduct(createProductDto: CreateProductDto) {
    const productExist = await ProductModel.findOne({
      name: createProductDto.name,
    });

    if (productExist) throw CustomError.badRequest('Product already exists');

    try {
      const product = await ProductModel.create(createProductDto);

      const productEntity = ProductEntity.fromObject(product);

      return productEntity;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}
