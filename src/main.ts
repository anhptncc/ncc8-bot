import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { BotGateway } from '@app/gateway/bot.gateway';
import { APP_CONSTANTS } from '@app/common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: APP_CONSTANTS.HTTP.CORS.ORIGIN,
    methods: APP_CONSTANTS.HTTP.CORS.METHODS,
  });

  const bot = app.get(BotGateway);
  bot.initEvent();

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');
}
bootstrap();
