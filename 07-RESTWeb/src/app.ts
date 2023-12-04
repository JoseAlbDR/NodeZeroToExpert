import { envs } from './config/envs';
import { Server } from './presentation/server';

(() => {
  main();
})();

function main() {
  const { PORT, PUBLIC_PATH } = envs;

  const server = new Server(PORT, PUBLIC_PATH);

  server.start();
}
