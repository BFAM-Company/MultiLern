import { Module } from '@nestjs/common';
import { FichesService } from './fiches.service';
import { FichesController } from './fiches.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [FichesController],
    providers: [FichesService],
    imports: [PrismaModule],
    exports: [FichesService],
})
export class FichesModule {}
