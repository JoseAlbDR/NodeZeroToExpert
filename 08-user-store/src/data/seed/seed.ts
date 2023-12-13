import { createInterface } from 'node:readline';
import { envs } from '../../config';
import { MongoDatabase } from '../mongo/mongo-db';
import { UserModel } from '../mongo/models/user.model';
import { CategoryModel } from '../mongo/models/category.model';
import { ProductModel } from '../mongo/models/product.model';
import { seedData } from './data';
const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x);
};

const confirmationQuestion = (text: string) => {
  return new Promise((resolve) => {
    // conectar readline con la consola
    const ifc = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    ifc.question(text, (res) => {
      ifc.close();
      resolve(res.toLowerCase() === 'yes' || res.toLowerCase() === 'y');
    });
  });
};

(async () => {
  await new Promise((resolve) =>
    resolve(
      MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
      })
    )
  );

  const confirmation = await confirmationQuestion(
    'Are you sure do you want to wipe and repopulate the database? (yes/no): '
  );

  if (!confirmation) {
    process.exit();
  }

  await main();

  await MongoDatabase.disconnect();
})();

async function main() {
  const [
    { deletedCount: deletedUsers },
    { deletedCount: deletedCategories },
    { deletedCount: deletedProducts },
  ] = await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  console.log(
    `Deleted ${deletedUsers} users, ${deletedCategories} categories, and ${deletedProducts} products`
  );

  // 1. Crear usuarios
  const users = await UserModel.insertMany(seedData.users);

  // 2. Crear categorias
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => ({
      ...category,
      user: users[randomBetween0AndX(seedData.users.length - 1)].id,
    }))
  );

  // 3. Crear productos
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => ({
      ...product,
      user: users[randomBetween0AndX(seedData.users.length - 1)].id,
      category:
        categories[randomBetween0AndX(seedData.categories.length - 1)].id,
    }))
  );

  console.log(
    `Created ${users?.length} users, ${categories?.length} categories and ${products?.length} products`
  );
}
