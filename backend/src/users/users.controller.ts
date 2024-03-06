import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserModelDto } from './dto/model-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/me')
    me(@Req() req) {
        const userId = req.user.userId;
        return this.usersService.findOne(userId);
    }

    @Post('/create')
    createUser(@Body() createUserDto: UserModelDto) {
        console.log(createUserDto);
        return this.usersService.create(createUserDto);
    }
}
