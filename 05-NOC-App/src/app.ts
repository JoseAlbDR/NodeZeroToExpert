import { Server } from './presentation/server';
import 'dotenv/config';

(async () => {
  main();
})();

function main() {
  // Server.start();
  console.log({ email: process.env.MAILER_EMAIL });
}
