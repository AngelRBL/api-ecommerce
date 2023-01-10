/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongoUri: process.env.mongoUri,
    stripeSecretKey: process.env.stripeKeyPrivate,
    secret_token: process.env.secret_token,
    sender: {
      mailUser: process.env.mailUser,
      mailPass: process.env.mailPass,
    },
  };
});
