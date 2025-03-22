import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  // Set environment variables
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./auth.db';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  );
  await app.listen();
}

bootstrap().catch((trace) => {
  console.error(trace);
});
