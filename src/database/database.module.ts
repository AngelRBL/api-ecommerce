import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { mongo } = configService;
        const { user, password, host, dbName, port, connection } = mongo;

        const uri = `${connection}://${user}:${password}@${host}:${port}/${dbName}?authSource=admin&readPreference=primary`;

        return {
          uri,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
