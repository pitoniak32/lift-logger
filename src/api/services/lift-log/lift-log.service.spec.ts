import { Test, TestingModule } from '@nestjs/testing';
import { LiftLogService } from './lift-log.service';

describe('LiftLogService', () => {
  let service: LiftLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiftLogService],
    }).compile();

    service = module.get<LiftLogService>(LiftLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
