import { Injectable } from '@nestjs/common';
import { findByNicknameAndPasswordUserDto } from './dto/findByNicknameAndPassword-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModelDto } from './dto/model-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    create(createUserDto: UserModelDto) {
        return this.prisma.users.create({
            data: createUserDto,
        });
    }

    findByUsernameAndPassword(
        userWhereNicknameAndPassword: findByNicknameAndPasswordUserDto
    ) {
        return this.prisma.users.findUnique({
            where: {
                nickname: userWhereNicknameAndPassword.nickname,
                password: userWhereNicknameAndPassword.password,
            },
        });
    }

    update(id: number, updateUserDto: UserModelDto) {
        return this.prisma.users.update({
            where: {
                id: id,
            },
            data: updateUserDto,
        });
    }
}
