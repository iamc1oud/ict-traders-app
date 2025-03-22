import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AUTH_USECASES } from './usecases';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [...AUTH_USECASES, PrismaService],
})
export class AuthModule {}
