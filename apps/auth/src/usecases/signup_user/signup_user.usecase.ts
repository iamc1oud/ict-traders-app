import { SignUpUserDTO } from '@app/dtos';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { RpcException } from '@nestjs/microservices';
import { PasswordManager } from '../../strategy/password-manager';

@Injectable()
export class SignupUsecase {
  constructor(
    private db: PrismaService,
    private passwordManager: PasswordManager,
  ) {}

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

    // Encode the password
    var encodedPassword = await this.passwordManager.encode(password);

    const newAuth = await this.db.auth.create({
      data: {
        email,
        password: encodedPassword,
      },
    });

    return {
      message: `Created new user with ${newAuth.id}`,
    };
  }
}
