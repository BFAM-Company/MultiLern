import {
    Controller,
    Body,
    Req,
    Ip,
    Post,
    Delete,
    UseGuards,
    Get,
    Request,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private prisma: PrismaService
    ) {}

    @Post('login')
    async login(@Req() req, @Ip() ip: string, @Body() body: LoginDto) {
        return this.authService.login(
            body.logginMethod,
            body.password,
            {
                ipAdress: ip,
                userAgent: req.headers['user-agent'],
            },
            body.email,
            body.isLogingFromOutside,
            body.username
        );
    }

    @Get('discord')
    @UseGuards(AuthGuard('discord'))
    discordLogin() {}

    @Get('discord/callback')
    @UseGuards(AuthGuard('discord'))
    async discordLoginCallback(@Request() req, @Res() res, @Ip() ip: string) {
        const user = await this.prisma.users.findFirst({
            where: {
                nickname: req.user.global_name,
                email: req.user.email,
                logginMethod: 'Discord',
            },
        });

        if (!user) {
            await this.usersService.create({
                nickname: req.user.global_name,
                password: '',
                email: req.user.email,
                logginMethod: 'Discord',
                avatar: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
            });
        }

        const userData = await this.authService.login(
            'Discord',
            '',
            {
                ipAdress: ip,
                userAgent: req.headers['user-agent'],
            },
            req.user.email,
            true,
            req.user.global_name
        );

        //TODO check if user uses mobile or web
        // res.redirect(
        //     `http://localhost:8081?accessToken=${userData.accessToken}&refreshToken=${userData.refreshToken}`
        // );
        res.redirect(
            `exp://192.168.33.8:8081?accessToken=${userData.accessToken}&refreshToken=${userData.refreshToken}`
        );
    }

    @Get('/users/me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
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
