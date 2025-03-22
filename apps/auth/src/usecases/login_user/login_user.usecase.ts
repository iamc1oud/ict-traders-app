import { LoginUserDTO } from '@app/dtos';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LoginUserUsecase {
  execute(data: LoginUserDTO): Promise<any> {
    // throw new RpcException(new BadGatewayException('User not found'));

    return {
      data,
    };
  }
}
