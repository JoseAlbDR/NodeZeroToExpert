import express from 'express';
import path from 'path';

interface Options {
  port: number;
  publicPath: string;
}
export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, publicPath } = options;
    this.port = port;
    this.publicPath = publicPath;
  }

  async start() {
    //* Middlewares

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.get('/api/todos', (req, res) => {
      res.json([
        {
          id: 1,
          text: 'Buy Milk',
          createdAt: new Date(),
        },
        {
          id: 2,
          text: 'Buy Milk',
          createdAt: null,
        },
        {
          id: 3,
          text: 'Buy Milk',
          createdAt: new Date(),
        },
      ]);
    });

    //* SPA
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, `../../${this.publicPath}/index.html`));
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
