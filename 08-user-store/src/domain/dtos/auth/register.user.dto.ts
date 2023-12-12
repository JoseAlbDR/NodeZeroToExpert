import { regularExps } from '../../../config';

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name || name === '') return ['Missing name'];
    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Invalid email'];
    if (!password) return ['Missing password'];
    if (!regularExps.password.test(password))
      return [
        'Invalid password, must have letters, numbers and symbols min 6 characters long',
      ];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
