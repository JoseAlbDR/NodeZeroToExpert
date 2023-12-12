import jwt from 'jsonwebtoken';

export class JwtAdapter {
  static generateToken = (
    payload: { [key: string]: any },
    duration: string = '2h'
  ) => {
    return new Promise((resolve) => {
      jwt.sign(payload, 'SEED', { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token);
      });
    });
  };

  static validateToken = (token: string) => {};
}
