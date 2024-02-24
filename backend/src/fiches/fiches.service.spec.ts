import { Test, TestingModule } from '@nestjs/testing';
import { FichesService } from './fiches.service';

describe('FichesService', () => {
    let service: FichesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FichesService],
        }).compile();

        service = module.get<FichesService>(FichesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
