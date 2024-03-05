import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [UsersModule, PrismaModule],
})
export class AuthModule {}
