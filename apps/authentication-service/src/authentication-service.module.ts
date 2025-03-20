import { Module } from '@nestjs/common';
import { AuthenticationServiceController } from './authentication-service.controller';
import { AuthenticationServiceService } from './authentication-service.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AuthenticationServiceController],
  providers: [AuthenticationServiceService, PrismaService],
})
export class AuthenticationServiceModule {}
