import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TranslationsModule } from './translations/translations.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [UsersModule, PrismaModule, TranslationsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
