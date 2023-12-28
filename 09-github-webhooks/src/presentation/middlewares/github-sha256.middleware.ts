import { NextFunction, Request, Response } from 'express';
import * as crypto from 'crypto';
import { envs } from '../../config';

export class GithubSha256Middleware {
  private static verify = (req: Request) => {
    const signature = crypto
      .createHmac('sha256', envs.SECRET_TOKEN)
      .update(JSON.stringify(req.body))
      .digest('hex');

    const xHubSignature = req.header('x-hub-signature-256') ?? '';

    let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    let untrusted = Buffer.from(xHubSignature, 'ascii');
    return crypto.timingSafeEqual(trusted, untrusted);
  };

  static verifySignature = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!this.verify(req)) {
      res.status(401).send('Unauthorized');
      return;
    }

    next();
  };
}
