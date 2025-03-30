import { LoginUserDTO } from '@app/dtos';
import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../../prisma.service';
import { PasswordManager } from '../../strategy/password-manager';

@Injectable()
export class LoginUserUsecase {
  constructor(
    private db: PrismaService,
    private passwordManager: PasswordManager,
  ) {}

  async execute(data: LoginUserDTO): Promise<any> {
    const { email, password } = data;

    try {
      var foundUser = await this.db.auth.findFirst({
        where: {
          email: email.toString(),
        },
      });

      if (!foundUser) {
        throw new RpcException(new NotFoundException('Email not found'));
      }


      if (!(await this.validatePassword(password, foundUser.password))) {
        throw new RpcException(new BadRequestException('Wrong credentials'));
      }

      if (foundUser.emailVerified == false) {
        throw new RpcException(
          new BadRequestException('Email is not verified'),
        );
      }


      return new Promise((resolve, reject) => {
        resolve({
          email,
          password,
        });
      });
    } catch (e) {
      throw e;
    }
  }

  // Validates the password
  async validatePassword(password: string, hash: string): Promise<boolean> {
    return await this.passwordManager.verify(password, hash);
  }
}
