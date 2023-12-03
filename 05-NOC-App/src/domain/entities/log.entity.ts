export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public message: string;
  public level: LogSeverityLevel;
  public origin: string;
  public createdAt?: Date;

  constructor(options: LogEntityOptions) {
    (this.message = options.message), (this.level = options.level);
    this.origin = options.origin;
    this.createdAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });

    log.createdAt = new Date(createdAt);

    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });

    return log;
  };
}
