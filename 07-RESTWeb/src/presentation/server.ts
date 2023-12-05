import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  publicPath: string;
  routes: Router;
}
export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, publicPath, routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    //* Middlewares

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use('/api/todos', this.routes);

    //* SPA
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, `../../${this.publicPath}/index.html`));
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
