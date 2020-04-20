import { Test, TestingModule } from '@nestjs/testing';
import { ReleaseController } from './release.controller';

describe('Release Controller', () => {
    let controller: ReleaseController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReleaseController]
        }).compile();

        controller = module.get<ReleaseController>(ReleaseController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
