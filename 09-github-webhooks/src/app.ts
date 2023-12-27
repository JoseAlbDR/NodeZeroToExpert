import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';

(() => {
  main();
})();

function main() {
  const app = express();
  app.use(express.json());

  const githubController = new GithubController();

  app.post('/api/v1/github', githubController.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server listening on port ${envs.PORT}`);
  });
}
