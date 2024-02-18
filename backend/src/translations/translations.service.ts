import { Injectable } from '@nestjs/common';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TranslationsService {
    constructor(private prisma: PrismaService) {}
    create(createTranslationDto: Prisma.translationsCreateInput) {
        return 'This action adds a new translation';
    }

    findAll() {
        return this.prisma.translations.findMany();
    }

    findOne(id: number) {
        // return `This action returns a #${id} translation`;
        return this.prisma.translations.findUnique({ where: { id } });
    }

    update(id: number, updateTranslationDto: Prisma.translationsUpdateInput) {
        return `This action updates a #${id} translation`;
    }

    remove(id: number) {
        return `This action removes a #${id} translation`;
    }
}
