import { Controller, Get } from '@nestjs/common';
import { AuthenticationServiceService } from './authentication-service.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AuthenticationServiceController {
  constructor(
    private readonly authenticationServiceService: AuthenticationServiceService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    return this.prisma.post.count();
  }
}
