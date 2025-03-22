import { NestFactory } from '@nestjs/core';
import { AppModule } from './gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilter } from './exceptions/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(3000);
}
bootstrap();
