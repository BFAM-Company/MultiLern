import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DiscordStrategy } from './strategies/discord.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, DiscordStrategy],
    imports: [UsersModule, PrismaModule, PassportModule],
})
export class AuthModule {}
