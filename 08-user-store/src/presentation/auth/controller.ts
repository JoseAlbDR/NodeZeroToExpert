import { Request, Response } from 'express';

export class AuthController {
  constructor() {}

  registerUser = async (req: Request, res: Response) => {
    res.json('registerUser');
  };

  loginUser = async (req: Request, res: Response) => {
    res.json('loginUser');
  };

  validateEmail = async (req: Request, res: Response) => {
    res.json('validateEmail');
  };
}
