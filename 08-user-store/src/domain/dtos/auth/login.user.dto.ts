import { regularExps } from '../../../config';

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['Email is required'];
    if (!regularExps.email.test(email)) return ['Email must be a valid email'];
    if (!password) return ['Password is required'];
    if (!regularExps.password.test(password))
      return ['Password must be a valid password'];

    return [undefined, new LoginUserDto(email, password)];
  }
}
