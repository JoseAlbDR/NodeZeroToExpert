import { bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

export class AuthService {
  // DI
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already registered');

    try {
      const user = new UserModel(registerUserDto);

      // Encrypt password
      user.password = bcryptAdapter.hash(registerUserDto.password);
      await user.save();
      // JWT

      // Confirmation email

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: userEntity, token: 'ABC' };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    let user;

    try {
      user = await UserModel.findOne({ email: loginUserDto.email });
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

    if (!user) throw CustomError.unauthorized(`Incorrect Email or Password`);

    const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password);
    if (!isMatch) throw CustomError.unauthorized('Incorrect Email or Password');

    const { password, ...userEntity } = UserEntity.fromObject(user);
    return { user: userEntity, token: 'ABC' };
  }
}
