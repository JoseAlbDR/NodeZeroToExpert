import { regularExps } from '../../../config';

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name || name === '') return ['Missing name', undefined];
    if (!email) return ['Missing email', undefined];
    if (!regularExps.email.test(email)) return ['Invalid email', undefined];
    if (!password) return ['Missing password', undefined];
    if (!regularExps.password.test(password))
      return [
        'Invalid password, must have letters, numbers and symbols min 6 characters long',
        undefined,
      ];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
