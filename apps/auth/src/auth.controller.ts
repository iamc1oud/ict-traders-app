import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginUserDTO } from '@app/dtos';

@Controller()
export class AuthenticationServiceController {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  @MessagePattern('login_user')
  async getHello(@Payload() data: LoginUserDTO): Promise<any> {
    return data;
  }
}
