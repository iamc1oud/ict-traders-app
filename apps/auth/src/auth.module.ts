import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AUTH_USECASES } from './usecases';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PasswordManager } from './strategy/password-manager';

@Module({
  imports: [
    JwtModule.register({
      secret: '23456789guyiiu'
    })
  ],
  controllers: [AuthController],
  providers: [...AUTH_USECASES, PrismaService, PasswordManager],
})
export class AuthModule {}
