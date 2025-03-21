import { LoginUserDTO } from "@app/dtos";
import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { SkipThrottle, ThrottlerGuard } from "@nestjs/throttler";

@UseGuards(ThrottlerGuard)
@Controller("/auth/")
export class AuthSvcController {
    constructor(
        @Inject('AUTH_SVC') private readonly authSvc: ClientProxy
    ) { }

    @Post()
    async getUser(@Body() body: LoginUserDTO) {
        return this.authSvc.send('login_user', body);
    }
}