import { LoginUserDTO } from '@app/dtos';
import {
  Body,
  Controller,
  HttpCode,
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
  @HttpCode(200)
  // eslint-disable-next-line @typescript-eslint/require-await
  async getUser(@Body() body: LoginUserDTO) {
    return this.authSvc.send('login_user', body).pipe(
      catchError((error: any) => {
        return throwError(() => error.response);
      }),
    );
  }
}
