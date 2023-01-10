import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendMail(email: string, subject: string, template: string) {
    return this.mailerService.sendMail({
      to: email,
      subject: subject,
      template: template,
      context: {
        name: 'user name',
      },
    });
  }
}
