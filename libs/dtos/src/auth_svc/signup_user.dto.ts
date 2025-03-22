import { IsEmail, IsStrongPassword } from "class-validator";

export class SignUpUserDTO {
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}