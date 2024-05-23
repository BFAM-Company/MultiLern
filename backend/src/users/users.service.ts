import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModelDto } from './dto/model-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    private saltOrRounds = 10;
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: UserModelDto) {
        try {
            const user = await this.prisma.users.findFirst({
                where: {
                    nickname: createUserDto.nickname,
                    email: createUserDto.email,
                    logginMethod: createUserDto.logginMethod,
                },
            });

            if (user) throw new Error();

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
                    logginMethod: createUserDto.logginMethod,
                },
            });
        } catch (error) {
            return error.message;
        }
    }

    async findByEmail(email: string) {
        try {
            const user = await this.prisma.users.findFirst({
                where: { email: email, logginMethod: 'Multilern' },
            });

            if (user) {
                return Promise.resolve(user);
            }
            return undefined;
        } catch (error) {
            return error.message;
        }
    }

    async findByUsername(username: string) {
        try {
            const user = await this.prisma.users.findFirst({
                where: { nickname: username, logginMethod: 'Multilern' },
            });

            if (user) {
                return Promise.resolve(user);
            }
            return undefined;
        } catch (error) {
            return error.message;
        }
    }

    async findWithLogginMethod(logginMethod: string, email: string) {
        try {
            const user = await this.prisma.users.findFirst({
                where: { email: email, logginMethod: logginMethod },
            });

            if (user) {
                return Promise.resolve(user);
            }
            return undefined;
        } catch (error) {
            return error.message;
        }
    }

    async findOne(id: number) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: id },
            });

            if (user) {
                return Promise.resolve(user);
            }
            return undefined;
        } catch (error) {
            return error.message;
        }
    }
}
