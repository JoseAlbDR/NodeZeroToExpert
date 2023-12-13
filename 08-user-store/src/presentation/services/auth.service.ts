import { JwtAdapter, bcryptAdapter, envs } from '../../config';
import { UserModel } from '../../data';
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';
import { EmailService } from './email.service';

export class AuthService {
  // DI
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already registered');

    try {
      const user = new UserModel(registerUserDto);

      // Encrypt password
      user.password = UserModel.hashPassword(registerUserDto.password);
      await user.save();

      // JWT
      const token = await JwtAdapter.generateToken({
        id: user.id,
        email: user.email,
      });

      // Confirmation email
      await this.sendEmailValidationLink(user.email);

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: userEntity, token };
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

    const isMatch = user.comparePassword(loginUserDto.password);
    if (!isMatch) throw CustomError.unauthorized('Incorrect Email or Password');

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });

    if (!token) throw CustomError.internalServer('Error while creating JWT');

    return { user: userEntity, token };
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });

    if (!token) throw CustomError.internalServer('Error while creating JWT');

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    };

    const isSent = this.emailService.sendEmail(options);

    if (!isSent)
      throw CustomError.internalServer('Error sending confirmation email');

    return true;
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);

    if (!payload) throw CustomError.badRequest('Invalid token');

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer('Email not in token');

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.internalServer('User not found');

    user.emailValidated = true;
    await user.save();

    return true;
  };
}
