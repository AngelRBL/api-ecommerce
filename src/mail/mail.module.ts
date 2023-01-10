import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as path from 'path';

import { MailService } from './services/mail.service';

import config from '../config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: ({ sender }: ConfigType<typeof config>) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: `${sender.mailUser}`,
            pass: `${sender.mailPass}`,
          },
        },
        defaults: {
          from: `"No Reply" <${sender.mailUser}>`,
        },
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [config.KEY],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
