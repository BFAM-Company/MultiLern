import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';

describe('TranslationsController', () => {
    let controller: TranslationsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TranslationsController],
            providers: [TranslationsService],
        }).compile();

        controller = module.get<TranslationsController>(TranslationsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
