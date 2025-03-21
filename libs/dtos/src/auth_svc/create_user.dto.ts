import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginUserDTO {
    @IsEmail()
    email: String;

    @IsStrongPassword()
    password: String;
 }