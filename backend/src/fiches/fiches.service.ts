import { Injectable } from '@nestjs/common';
import { CreateFichDto } from './dto/create-fich.dto';
import { UpdateFichDto } from './dto/update-fich.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FichesService {
    constructor(private readonly prisma: PrismaService) {}

    create(createFichDto: CreateFichDto) {
        try {
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
        } catch (e) {
            return e.message;
        }
    }

    findAll(page: number) {
        try {
            return this.prisma.fiches.findMany({
                skip: page * 10,
                take: 10,
            });
        } catch (e) {
            return e.message;
        }
    }

    findById(id: number) {
        try {
            return this.prisma.fiches.findUnique({
                where: {
                    id: id,
                },
                include: {
                    fiches_translations: {
                        select: {
                            id: true,
                            translations: true,
                        },
                        orderBy: {
                            id: 'desc',
                        },
                    },
                },
            });
        } catch (e) {
            return e.message;
        }
    }

    findAllByUser(id: number, page: number) {
        try {
            return this.prisma.fiches.findMany({
                where: { users_fiches: { some: { userId: id } } },
                skip: page * 10,
                take: 10,
            });
        } catch (e) {
            return e.message;
        }
    }

    update(id: number, updateFichDto: UpdateFichDto) {
        try {
            return this.prisma.fiches.update({
                where: { id: id },
                data: {
                    title: updateFichDto.title,
                    fiches_translations: {
                        create: updateFichDto.translationsList,
                    },
                },
            });
        } catch (e) {
            return e.message;
        }
    }

    async remove(id: number) {
        try {
            await this.prisma.fiches_translations.deleteMany({
                where: {
                    fichesId: id,
                },
            });
            await this.prisma.translations.deleteMany({
                where: {
                    fiches_translations: {
                        some: {
                            fichesId: id,
                        },
                    },
                },
            });
            await this.prisma.users_fiches.deleteMany({
                where: {
                    fichesId: id,
                },
            });
            await this.prisma.fiches.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            return error.message;
        }
    }
}
