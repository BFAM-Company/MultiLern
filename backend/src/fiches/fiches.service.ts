import { Injectable } from '@nestjs/common';
import { CreateFichDto } from './dto/create-fich.dto';
import { UpdateFichDto } from './dto/update-fich.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FichesService {
    constructor(private readonly prisma: PrismaService) {}

    create(createFichDto: CreateFichDto) {
        return this.prisma.fiches.create({
            data: {
                title: createFichDto.title,
                users_fiches: {
                    create: {
                        userId: createFichDto.userId,
                    },
                },
                fiches_translations: {
                    create: createFichDto.translationsList,
                },
            },
        });
    }

    findAll() {
        return this.prisma.fiches.findMany();
    }

    findAllByUser(id: number) {
        return this.prisma.fiches.findMany({ where: { id: id } });
    }

    //TODO mozliwosc zmiany tlumaczen
    update(id: number, updateFichDto: UpdateFichDto) {
        return this.prisma.fiches.update({
            where: { id: id },
            data: {
                title: updateFichDto.title,
            },
        });
    }

    remove(id: number) {
        return this.prisma.fiches.delete({ where: { id: id } });
    }
}
