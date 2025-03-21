import { ClientProxy } from '@nestjs/microservices';
import { AuthSvcController } from './auth_svc.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginUserDTO } from '@app/dtos';

describe('AuthSvcController', () => {
  let controller: AuthSvcController;
  let authSvc: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthSvcController],
      providers: [
        {
          provide: 'AUTH_SVC',
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
    authSvc = module.get<ClientProxy>('AUTH_SVC');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('loginUser', () => {
    it('should call authSvc.send with the correct arguments and return the result', async () => {
      const loginUserDto: LoginUserDTO = {
        email: 'ajay@ict.in',
        password: 'password'
      };

      const result = await controller.getUser(loginUserDto);

      expect(authSvc.send).toHaveBeenCalledWith(
        'login_user',
        loginUserDto,
      );

      expect(result).toEqual({
        success: true,
        data: loginUserDto,
      });
    });
  });
});
