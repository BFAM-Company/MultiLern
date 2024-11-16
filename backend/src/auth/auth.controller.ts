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
    Param,
    Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFichDto } from 'src/fiches/dto/create-fich.dto';
import { FichesService } from 'src/fiches/fiches.service';
import { UpdateFichDto } from 'src/fiches/dto/update-fich.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly fichesService: FichesService,
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

        res.redirect(
            // `exp://192.168.33.8:8081?accessToken=${userData.accessToken}&refreshToken=${userData.refreshToken}`
            `http://localhost:5173/login?accessToken=${userData.accessToken}&refreshToken=${userData.refreshToken}`
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

    @Post('fiches')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    create(@Body() createFichDto: CreateFichDto) {
        return this.fichesService.create(createFichDto);
    }

    @Delete('fiches/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
        return this.fichesService.remove(+id);
    }

    @Patch('fiches/:id')
    update(@Param('id') id: string, @Body() updateFichDto: UpdateFichDto) {
        return this.fichesService.update(+id, updateFichDto);
    }
}
