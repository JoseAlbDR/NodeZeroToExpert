import express from 'express';
import path from 'path';

interface Options {
  PORT: number;
  PUBLIC_PATH: string;
}
export class Server {
  private app = express();

  constructor(private readonly options: Options) {}

  async start() {
    //* Middlewares

    //* Public Folder
    this.app.use(express.static(this.options.PUBLIC_PATH));

    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'));
    });

    this.app.listen(this.options.PORT, () => {
      console.log(`Server running on port ${this.options.PORT}`);
    });
  }
}
