import * as dotenv from 'dotenv';

// const ENV = process.env.ENV;
// export const envFilePath = `.env.${ENV ?? "local"}`;

export const envFilePath = `.env`;

dotenv.config({ path: envFilePath });

export default () => ({
  POSTGRES_HOST: process.env.POSTGRES_HOST || '',
  POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,
  POSTGRES_USER: process.env.POSTGRES_USER || '',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '',
  POSTGRES_DB: process.env.POSTGRES_DB || '',
  MEZON_TOKEN: process.env.MEZON_TOKEN || '',
  BOT_ID: process.env.BOT_ID || '',
  NCC8_CHANNEL_ID: process.env.NCC8_CHANNEL_ID || '',
  GOOGLE_SERVICE_ACCOUNT_JSON: process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '',
  CONFESSION_CHANNEL_ID: process.env.CONFESSION_CHANNEL_ID || '',
});
