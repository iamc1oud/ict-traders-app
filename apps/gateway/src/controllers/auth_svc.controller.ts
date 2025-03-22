import { LoginUserDTO, SignUpUserDTO } from '@app/dtos';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';
import { catchError, throwError } from 'rxjs';

@UseGuards(ThrottlerGuard)
@Controller('/auth/')
export class AuthSvcController {
  constructor(@Inject('AUTH_SVC') private readonly authSvc: ClientProxy) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  // eslint-disable-next-line @typescript-eslint/require-await
  async getUser(@Body() body: LoginUserDTO) {
    return this.authSvc.send('login_user', body).pipe(
      catchError((error: any) => {
        return throwError(() => error.response);
      }),
    );
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: SignUpUserDTO) {
    return this.authSvc.send('signup_user', body).pipe(
      catchError((error: any) => {
        return throwError(() => error.response);
      }),
    );
  }
}
