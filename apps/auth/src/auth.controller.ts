import { Controller } from '@nestjs/common';
import { LoginUserUsecase } from './usecases/login_user';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginUserDTO } from '@app/dtos';

@Controller()
export class AuthController {
  constructor(private readonly loginUser: LoginUserUsecase) {}

  @MessagePattern('login_user')
  login(@Payload() data: LoginUserDTO): Promise<any> {
    return this.loginUser.execute(data);
  }
}
