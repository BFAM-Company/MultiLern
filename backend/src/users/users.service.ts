import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModelDto } from './dto/model-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    private saltOrRounds = 10;
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: UserModelDto) {
        const hashedPassword = await hash(
            createUserDto.password,
            this.saltOrRounds
        );
        return this.prisma.users.create({
            data: {
                password: hashedPassword,
                nickname: createUserDto.nickname,
                email: createUserDto.email,
                avatar: createUserDto.avatar,
            },
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
}
