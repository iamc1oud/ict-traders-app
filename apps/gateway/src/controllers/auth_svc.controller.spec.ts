/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ClientProxy } from '@nestjs/microservices';
import { AuthSvcController } from './auth_svc.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginUserDTO } from '@app/dtos';
import { ThrottlerModule } from '@nestjs/throttler';
import { ENV } from '../constants';

describe('AuthSvcController', () => {
  let controller: AuthSvcController;
  let authSvc: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot([
          {
            ttl: 60,
            limit: 10,
          },
        ]),
      ],
      controllers: [AuthSvcController],
      providers: [
        {
          provide: ENV.AUTH_SVC,
          useValue: {
            send: jest.fn().mockImplementation((cmd, data) => {
              if (cmd == 'login_user') {
                return Promise.resolve({ success: true, data });
              }

              return Promise.resolve({ success: false, data });
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthSvcController>(AuthSvcController);
    authSvc = module.get<ClientProxy>(ENV.AUTH_SVC);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('loginUser', () => {
    it('should call authSvc.send with the correct arguments and return the result', async () => {
      const loginUserDto: LoginUserDTO = {
        email: 'ajay@ict.in',
        password: 'password',
      };

      const result = await controller.getUser(loginUserDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(authSvc.send).toHaveBeenCalledWith('login_user', loginUserDto);

      expect(result).toEqual({
        success: true,
        data: loginUserDto,
      });
    });
  });
});
