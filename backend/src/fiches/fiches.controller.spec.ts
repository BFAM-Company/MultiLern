import { Test, TestingModule } from '@nestjs/testing';
import { FichesController } from './fiches.controller';
import { FichesService } from './fiches.service';

describe('FichesController', () => {
    let controller: FichesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FichesController],
            providers: [FichesService],
        }).compile();

        controller = module.get<FichesController>(FichesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
