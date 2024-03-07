import {
    Controller,
    Body,
    Req,
    Ip,
    Post,
    Delete,
    UseGuards,
    Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

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

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/users/me')
    me(@Req() req) {
        const userId = req.user.userId;
        return this.usersService.findOne(userId);
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
