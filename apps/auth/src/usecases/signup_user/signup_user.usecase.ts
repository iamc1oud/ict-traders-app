import { SignUpUserDTO } from '@app/dtos';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SignupUsecase {
  constructor(private db: PrismaService) {}

  async execute(data: SignUpUserDTO) {
    const { email, password } = data;

    const user = await this.db.auth.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new RpcException(
        new BadRequestException('Email is already registered'),
      );
    }

    // Create instance
    const newAuth = await this.db.auth.create({
      data: {
        email,
        password,
      },
    });

    return {
      message: 'Created new user',
      data: {
        newAuth
      },
    };
  }
}
