import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    return throwError(() => response.status(404).json(exception));
  }
}
