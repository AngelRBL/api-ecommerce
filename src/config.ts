/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      dbName: process.env.MONGO_INITDB_ROOT_DB,
      connection: process.env.MONGO_CONNECTION,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
    },
    stripeSecretKey: process.env.stripeKeyPrivate,
    secret_token: process.env.secret_token,
    sender: {
      mailUser: process.env.mailUser,
      mailPass: process.env.mailPass,
    },
  };
});
