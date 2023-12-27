import { Request, Response } from 'express';

export class GithubController {
  constructor() {}

  webhookHandler = (req: Request, res: Response) => {
    res.json('W0la');
  };
}
