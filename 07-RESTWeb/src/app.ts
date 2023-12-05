import 'express-async-errors';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
  main();
})();

function main() {
  const { PORT, PUBLIC_PATH } = envs;
  const router = AppRoutes.routes;

  const server = new Server({
    port: PORT,
    publicPath: PUBLIC_PATH,
    routes: router,
  });

  server.start();
}
