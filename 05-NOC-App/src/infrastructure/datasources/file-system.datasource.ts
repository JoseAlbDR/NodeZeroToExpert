import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import fs from 'fs';

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-all.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, '');
      }
    );
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (log.level === LogSeverityLevel.low) return;
    if (log.level === LogSeverityLevel.medium)
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    if (log.level === LogSeverityLevel.high)
      fs.appendFileSync(this.highLogsPath, logAsJson);
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error('Method not implemented.');
  }
}
