import { Controller, NotImplementedException } from '@nestjs/common';
import { LoginUserUsecase } from './usecases/login_user';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { LoginUserDTO, SignUpUserDTO } from '@app/dtos';
import { SignupUsecase } from './usecases/signup_user';

@Controller()
export class AuthController {
  constructor(
    private readonly loginUser: LoginUserUsecase,
    private readonly signupUser: SignupUsecase,
  ) {}

  @MessagePattern('login_user')
  login(@Payload() data: LoginUserDTO): Promise<any> {
    return this.loginUser.execute(data);
  }

  @MessagePattern('signup_user')
  signup(@Payload() data: SignUpUserDTO): Promise<any> {
    return this.signupUser.execute(data);
  }
}
