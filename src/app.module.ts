import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { enviroments } from './enviroments';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BrandsModule } from './modules/brands/brands.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        secret_token: Joi.string().required(),
        mongoUri: Joi.string().required(),
        mailUser: Joi.string().required(),
        mailPass: Joi.string().required(),
        stripeKeyPrivate: Joi.string().required(),
        stripeKeyPublishable: Joi.string().required(),
        stripeApiVersion: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MailModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
    BrandsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
