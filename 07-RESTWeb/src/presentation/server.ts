import express, { Router } from 'express';
import path from 'path';
import compression from 'compression';
import { ErrorHandler } from '../middleware/errorHandler';

interface Options {
  port: number;
  publicPath: string;
  routes: Router;
}
export class Server {
  public readonly app = express();
  private serverListener?: any;
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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded
    this.app.use(compression());

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use('/', this.routes);

    //* SPA
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, `../../${this.publicPath}/index.html`));
    });

    //* Error Handler
    this.app.use(ErrorHandler.init);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
