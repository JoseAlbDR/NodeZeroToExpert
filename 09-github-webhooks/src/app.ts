import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';

(() => {
  main();
})();

function main() {
  const app = express();
  app.use(express.json());

  const githubController = new GithubController();

  app.post(
    '/api/v1/github',
    GithubSha256Middleware.verifySignature,
    githubController.webhookHandler
  );

  app.listen(envs.PORT, () => {
    console.log(`Server listening on port ${envs.PORT}`);
  });
}
