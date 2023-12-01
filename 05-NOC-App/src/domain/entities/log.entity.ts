export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  constructor(
    public message: string,
    public level: LogSeverityLevel,
    public createdAt?: Date
  ) {
    this.createdAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);

    const log = new LogEntity(level, message);

    log.createdAt = new Date(createdAt);

    return log;
  };
}
