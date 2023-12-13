import { ProductModel } from '../../data';
import { CustomError, PaginationDto, UserEntity } from '../../domain';
import { ProductEntity } from '../../domain/entities/product.entity';

export class ProductsService {
  constructor() {}

  public async getProducts(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .populate({ path: 'user' })
          .skip((page + 1) * limit)
          .limit(limit),
      ]);

      const maxPages = Math.ceil(total / limit);

      const productEntities = products.map((product) =>
        ProductEntity.fromObject({
          ...product,
          user: UserEntity.fromObject(product.user),
        })
      );

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

  public async createProduct() {
    return 'Create Product';
  }
}
