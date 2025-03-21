import { Module } from '@nestjs/common';
import { AuthenticationServiceController } from './auth.controller';
import { PrismaService } from './prisma.service';
import { AuthenticationServiceService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthenticationServiceController],
  providers: [AuthenticationServiceService, PrismaService],
})
export class AuthModule {}
