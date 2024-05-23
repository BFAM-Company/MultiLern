import { Test, TestingModule } from '@nestjs/testing';
import { FichesController } from './fiches.controller';
import { FichesService } from './fiches.service';

describe('FichesController', () => {
    let controller: FichesController;
    let service: FichesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FichesController],
            providers: [
                {
                    provide: FichesService,
                    useValue: {
                        findAll: jest.fn(),
                        findById: jest.fn(),
                        findAllByUser: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<FichesController>(FichesController);
        service = module.get<FichesService>(FichesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of fiches', async () => {
            const page = '1';
            const result = [
                { id: 1, title: 'Fich 1' },
                { id: 2, title: 'Fich 2' },
            ];
            jest.spyOn(service, 'findAll').mockResolvedValue(result);
            expect(await controller.findAll(page)).toBe(result);
            expect(service.findAll).toHaveBeenCalledWith(1);
        });
    });

    describe('findAllByUser', () => {
        it('should return an array of fiches by user id', async () => {
            const userId = '1';
            const page = '1';
            const result = [
                { id: 1, title: 'Fich 1' },
                { id: 2, title: 'Fich 2' },
            ];
            jest.spyOn(service, 'findAllByUser').mockResolvedValue(result);
            expect(await controller.findAllByUser(userId, page)).toBe(result);
            expect(service.findAllByUser).toHaveBeenCalledWith(1, 1);
        });
    });

    describe('findById', () => {
        it('should return a fich by id', async () => {
            const id = '1';
            const result = {
                id: 1,
                title: 'Test Fich',
                fiches_translations: [
                    {
                        id: 1,
                        translations: {
                            id: 1,
                            foreignTranslation: 'home',
                            polishTranslation: 'dom',
                        },
                    },
                    {
                        id: 2,
                        translations: {
                            id: 2,
                            foreignTranslation: 'dog',
                            polishTranslation: 'pies',
                        },
                    },
                ],
            };
            jest.spyOn(service, 'findById').mockResolvedValue(result);
            expect(await controller.findById(id)).toBe(result);
            expect(service.findById).toHaveBeenCalledWith(1);
        });
    });
});
