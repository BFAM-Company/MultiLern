import { Controller, Body, Req, Ip, Post, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Req() req, @Ip() ip: string, @Body() body: LoginDto) {
        return this.authService.login(
            body.password,
            {
                ipAdress: ip,
                userAgent: req.headers['user-agent'],
            },
            body.email,
            body.username
        );
    }

    @Post('refresh')
    async refreshToken(@Body() body: RefreshTokenDto) {
        return this.authService.refresh(body.refreshToken);
    }

    @Delete('logout')
    async logout(@Body() body: RefreshTokenDto) {
        return this.authService.logout(body.refreshToken);
    }
}
