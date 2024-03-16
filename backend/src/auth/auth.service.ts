import { Injectable } from '@nestjs/common';
import RefreshToken from './entities/refresh-token.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { sign, verify } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private prisma: PrismaService
    ) {}

    async refresh(refreshStr: string): Promise<string | undefined> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if (!refreshToken) return undefined;

        const user = await this.userService.findOne(refreshToken.userId);

        if (!user) return undefined;

        const accessToken = {
            userId: refreshToken.userId,
        };

        return sign(accessToken, process.env.ACCESS_SECRET, {
            expiresIn: '5m',
        });
    }

    private async retrieveRefreshToken(
        refreshStr: string
    ): Promise<RefreshToken | undefined> {
        try {
            const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
            if (typeof decoded === 'string') return undefined;
            const refreshToken = await this.prisma.refresh_tokens.findUnique({
                where: { id: decoded.id },
            });
            return Promise.resolve(this.prismaTokenToObject(refreshToken));
        } catch (e) {
            return undefined;
        }
    }

    async login(
        logginMethod: string,
        password: string,
        values: { userAgent: string; ipAdress: string },
        email?: string,
        isLoggingFromOutside: boolean = false,
        username?: string
    ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
        let user;
        if (logginMethod === 'Multilern') {
            user = email
                ? await this.userService.findByEmail(email)
                : await this.userService.findByUsername(username);
        } else
            user = await this.userService.findWithLogginMethod(
                logginMethod,
                email
            );

        if (!user) {
            return undefined;
        }

        if (!isLoggingFromOutside) {
            const isMatch = await compare(password, user.password);
            if (!isMatch) return undefined;
        }

        return this.newRefreshAndAccessToken(user, values);
    }

    private async newRefreshAndAccessToken(
        user: User,
        values: { userAgent: string; ipAdress: string }
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const newRefreshToken = await this.prisma.refresh_tokens.create({
            data: {
                userAgent: values.userAgent,
                ipAdress: values.ipAdress,
                users: {
                    connect: { id: user.id },
                },
            },
        });

        const refreshObject = this.prismaTokenToObject(newRefreshToken);

        return {
            refreshToken: refreshObject.sign(),
            accessToken: sign(
                {
                    userId: user.id,
                },
                process.env.ACCESS_SECRET,
                {
                    expiresIn: '5m',
                }
            ),
        };
    }

    async logout(refreshStr): Promise<void> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);

        if (!refreshToken) {
            return;
        }

        await this.prisma.refresh_tokens.delete({
            where: { id: refreshToken.id },
        });
    }

    private prismaTokenToObject(prismaResponse: any) {
        return new RefreshToken({
            id: prismaResponse.id,
            userAgent: prismaResponse.userAgent,
            ipAdress: prismaResponse.ipAdress,
            userId: prismaResponse.userId,
        });
    }
}
