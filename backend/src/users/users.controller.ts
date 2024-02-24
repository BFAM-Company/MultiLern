import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModelDto } from './dto/model-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: UserModelDto) {
        return this.usersService.create(createUserDto);
    }

    @Get(':nickname/:password')
    findByUsernameAndPassword(
        @Param('nickname') nickname: string,
        @Param('password') password: string
    ) {
        return this.usersService.findByUsernameAndPassword({
            nickname,
            password,
        });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UserModelDto) {
        return this.usersService.update(+id, updateUserDto);
    }
}
