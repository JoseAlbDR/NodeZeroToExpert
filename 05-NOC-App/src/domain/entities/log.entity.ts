export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  constructor(
    public level: LogSeverityLevel,
    public message: string,
    public createdAt: Date
  ) {
    this.createdAt = new Date();
  }
}
