import { WssService } from './presentation/services/wss.service';
import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  const httpServer = createServer(server.app);

  WssService.initWss({ server: httpServer, path: '/ws' });

  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  });
}