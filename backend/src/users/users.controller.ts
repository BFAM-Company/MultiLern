import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

import { UserModelDto } from './dto/model-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/create')
    createUser(@Body() createUserDto: UserModelDto) {
        return this.usersService.create(createUserDto);
    }
}
