import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { LiftLogService } from '../../services/lift-log/lift-log.service'
import { LiftLogController } from './lift-log.controller'

describe('LiftLogController', () => {
  let app: INestApplication
  let controller: LiftLogController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiftLogController],
      providers: [{ provide: LiftLogService, useValue: {} }],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    controller = app.get<LiftLogController>(LiftLogController)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
