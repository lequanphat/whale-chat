import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // static
  app.use(express.static(join(__dirname, '..', 'public')));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`App running on port  ${PORT}`);
  });
}
bootstrap();
