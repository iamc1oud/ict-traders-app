import { NestFactory } from '@nestjs/core';
import { AuthenticationServiceModule } from './authentication-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
