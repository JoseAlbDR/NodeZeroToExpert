import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.implementation';
import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started...');

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
    //   const url = 'http://localhost:3000';
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute('http://localhost:3000');
    // });
  }
}
