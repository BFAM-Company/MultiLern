import { Module } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [TranslationsController],
    providers: [TranslationsService],
    imports: [PrismaModule],
})
export class TranslationsModule {}
