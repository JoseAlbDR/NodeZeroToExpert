import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.json(user))
      .catch((err) => this.handleError(err, res));
  };

  loginUser = async (req: Request, res: Response) => {
    res.json('loginUser');
  };

  validateEmail = async (req: Request, res: Response) => {
    res.json('validateEmail');
  };
}
