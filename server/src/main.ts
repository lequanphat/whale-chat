import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT, corsOptions } from './config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { HttpExceptionFilter } from './common/filter/ExceptionFilter.filter';
import { RoleGuard } from './common/guards/role.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // static
  app.use(express.static(join(__dirname, '..', 'public')));
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new RoleGuard(app.get(Reflector)));
  await app.listen(PORT, () => {
    console.log(`App running on port  ${PORT}`);
  });
}
bootstrap();
