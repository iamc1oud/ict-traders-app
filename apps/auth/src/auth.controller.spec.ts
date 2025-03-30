import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller"
import { SignupUsecase } from "./usecases/signup_user";
import { LoginUserUsecase } from "./usecases/login_user";
import { SignUpUserDTO } from "@app/dtos";

// Usecases
const mockSignupUsecase = {
    execute: jest.fn(),
}

const mockLoginUsecase = {
    execute: jest.fn(),
}

describe('AuthController', () => {
    let controller: AuthController;
    let signupUsecase: SignupUsecase;
    let loginUsecase: LoginUserUsecase;

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: SignupUsecase,
                    useValue: mockSignupUsecase
                }, {
                    provide: LoginUserUsecase,
                    useValue: mockLoginUsecase
                }
            ]
        }).compile();

        controller = module.get<AuthController>(AuthController);
        signupUsecase = module.get<SignupUsecase>(SignupUsecase);
        loginUsecase = module.get<LoginUserUsecase>(LoginUserUsecase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(signupUsecase).toBeDefined();
        expect(loginUsecase).toBeDefined();
    });

    describe('signup', () => {
        it('should call execute with the provided DTO', async () => {
            const signupDto = new SignUpUserDTO();
            signupDto.email = 'new@example.com';
            signupDto.password = 'newUser';
        });

        
     });

});

