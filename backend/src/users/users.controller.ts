import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

//localhost:3000-(czy ile tam bedziemy mieli w dockerze itp)/users
@Controller('users')
export class UsersController {
    private usersService;

    constructor(usersServive: UsersService) {
        this.usersService = usersServive;
    }

    @Get()
    getAllUsers() {
        //nie wiem czy nie useless ale bedzie najwyzej sie usunie
        return this.usersService.getAll();
    }

    @Get('/:id')
    getUser(@Param('id') id: string) {
        return this.usersService.getByID(parseInt(id));
    }

    @Post()
    addUser(@Body() body: CreateUserDto) {
        return this.usersService.add(body.name, body.email);
    }

    @Delete('/:id')
    @HttpCode(204)
    removeProduct(@Param('id') id: string) {
        return this.usersService.removeById(parseInt(id));
    }
}
