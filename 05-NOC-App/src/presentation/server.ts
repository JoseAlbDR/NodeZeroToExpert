import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.implementation';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log('Server started...');

    //Mandar email
    const emailService = new EmailService();
    emailService.sendEmail({
      to: 'yusepah@gmail.com',
      subject: 'Logs de Sistema',
      htmlBody: `
        <h3>Logs de sistema - NOC</h3>
        <p>Ver logs adjuntos</p>
      `,
    });

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
