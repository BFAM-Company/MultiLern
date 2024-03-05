import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModelDto } from './dto/model-user.dto';

@Injectable()
export class UsersService {
    private saltOrRounds = 10;
    constructor(private prisma: PrismaService) {}
    create(createUserDto: UserModelDto) {
        return this.prisma.users.create({
            data: createUserDto,
        });
    }

    async findByEmail(email: string) {
        const user = await this.prisma.users.findUnique({
            where: { email: email },
        });

        if (user) {
            return Promise.resolve(user);
        }
        return undefined;
    }

    async findByUsername(username: string) {
        const user = await this.prisma.users.findUnique({
            where: { nickname: username },
        });

        if (user) {
            return Promise.resolve(user);
        }
        return undefined;
    }

    async findOne(id: number) {
        const user = await this.prisma.users.findUnique({
            where: { id: id },
        });

        if (user) {
            return Promise.resolve(user);
        }
        return undefined;
    }

    // findByUsernameAndPassword(
    //     userWhereNicknameAndPassword: findByNicknameAndPasswordUserDto
    // ) {
    //     return this.prisma.users.findUnique({
    //         where: {
    //             nickname: userWhereNicknameAndPassword.nickname,
    //             password: userWhereNicknameAndPassword.password,
    //         },
    //     });
    // }

    // update(id: number, updateUserDto: UserModelDto) {
    //     return this.prisma.users.update({
    //         where: {
    //             id: id,
    //         },
    //         data: updateUserDto,
    //     });
    // }
}
