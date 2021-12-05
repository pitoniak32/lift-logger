import { Test, TestingModule } from '@nestjs/testing';
import { LiftLogController } from './lift-log.controller';

describe('LiftLogController', () => {
  let controller: LiftLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiftLogController],
    }).compile();

    controller = module.get<LiftLogController>(LiftLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
