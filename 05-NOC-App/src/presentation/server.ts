import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.implementation';
import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgreSQLLogDatasource } from '../infrastructure/datasources/postgresql-log.datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgreLogRepository = new LogRepositoryImpl(
  new PostgreSQLLogDatasource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started...');

    // const logs = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);

    //Mandar email
    // const emailService = new EmailService();
    // emailService.sendEmail({
    //   to: 'yusepah@gmail.com',
    //   subject: 'Logs de Sistema',
    //   htmlBody: `
    //     <h3>Logs de sistema - NOC</h3>
    //     <p>Ver logs adjuntos</p>
    //   `,
    // });

    // Mandar mail con system logs
    // emailService.sendEmailWithFileSystemLogs('yusepah@gmail.com');
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   'yusepah@gmail.com'
    // );

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://googledddx.com';
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com';
    //   new CheckServiceMultiple(
    //     [fileSystemLogRepository, mongoLogRepository, postgreLogRepository],
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
