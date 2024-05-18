import { Test, TestingModule } from '@nestjs/testing';
import { FichesService } from './fiches.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFichDto } from './dto/create-fich.dto';
import { UpdateFichDto } from './dto/update-fich.dto';

describe('FichesService', () => {
    let service: FichesService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FichesService,
                {
                    provide: PrismaService,
                    useValue: {
                        fiches: {
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            create: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                        },
                        fiches_translations: {
                            deleteMany: jest.fn(),
                        },
                        translations: {
                            deleteMany: jest.fn(),
                        },
                        users_fiches: {
                            deleteMany: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<FichesService>(FichesService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new fich', async () => {
            const createFichDto: CreateFichDto = {
                title: 'Test Fich',
                userId: 1,
                translationsList: [
                    {
                        translations: {
                            create: {
                                foreignTranslation: 'test',
                                polishTranslation: 'test',
                            },
                        },
                    },
                ],
            };
            await service.create(createFichDto);
            expect(prismaService.fiches.create).toHaveBeenCalledWith({
                data: {
                    title: 'Test Fich',
                    users_fiches: { create: { userId: 1 } },
                    fiches_translations: {
                        create: [
                            {
                                translations: {
                                    create: {
                                        foreignTranslation: 'test',
                                        polishTranslation: 'test',
                                    },
                                },
                            },
                        ],
                    },
                },
            });
        });
    });

    describe('findAll', () => {
        it('should return an array of fiches', async () => {
            const result = [
                { id: 1, title: 'Fich 1' },
                { id: 2, title: 'Fich 2' },
            ];
            jest.spyOn(prismaService.fiches, 'findMany').mockResolvedValue(
                result
            );
            const page = 0;
            expect(await service.findAll(page)).toBe(result);
        });
    });

    describe('findById', () => {
        it('should return a fich by id', async () => {
            const result = { id: 1, title: 'Test Fich' };
            jest.spyOn(prismaService.fiches, 'findUnique').mockResolvedValue(
                result
            );
            const id = 1;
            expect(await service.findById(id)).toBe(result);
        });
    });

    describe('findAllByUser', () => {
        it('should return an array of fiches by user id', async () => {
            const result = [
                { id: 1, title: 'Fich 1' },
                { id: 2, title: 'Fich 2' },
            ];
            jest.spyOn(prismaService.fiches, 'findMany').mockResolvedValue(
                result
            );
            const userId = 1;
            const page = 0;
            expect(await service.findAllByUser(userId, page)).toBe(result);
        });
    });

    describe('update', () => {
        it('should update a fich by id', async () => {
            const updateFichDto: UpdateFichDto = {
                title: 'Updated Fich',
                translationsList: [],
            };
            const id = 1;
            await service.update(id, updateFichDto);
            expect(prismaService.fiches.update).toHaveBeenCalledWith({
                where: { id },
                data: {
                    title: 'Updated Fich',
                    fiches_translations: { create: [] },
                },
            });
        });
    });

    describe('remove', () => {
        it('should remove a fich by id', async () => {
            const id = 1;
            await service.remove(id);
            expect(
                prismaService.fiches_translations.deleteMany
            ).toHaveBeenCalledWith({ where: { fichesId: id } });
            expect(prismaService.translations.deleteMany).toHaveBeenCalledWith({
                where: { fiches_translations: { some: { fichesId: id } } },
            });
            expect(prismaService.users_fiches.deleteMany).toHaveBeenCalledWith({
                where: { fichesId: id },
            });
            expect(prismaService.fiches.delete).toHaveBeenCalledWith({
                where: { id },
            });
        });
    });

    // Similarly, you can write tests for other methods like findAll, findById, findAllByUser, update, and remove.
});
