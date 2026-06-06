import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get<{ port: number }>('server');

  const port = serverConfig.port;

  await app.listen(port);

  Logger.log(`Application is running on port: ${port}`);
}
bootstrap();
