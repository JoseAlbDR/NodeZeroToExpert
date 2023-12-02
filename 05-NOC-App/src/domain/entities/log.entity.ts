export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions{
   public message: string,
    public level: LogSeverityLevel,
    public origin: string,
    public createdAt?: Date
}

export class LogEntity {
   public message: string,
    public level: LogSeverityLevel,
    public origin: string,
    public createdAt?: Date
  constructor(
   options: LogEntityOptions
  ) {
    this.message = options.message,
    this.level = options.level
    this.origin = options.origin
    this.createdAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);

    const log = new LogEntity(level, message);

    log.createdAt = new Date(createdAt);

    return log;
  };
}
