import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { LiftRootService } from '../../services/lift-root/lift-root.service'
import { LiftRootController } from './lift-root.controller'

describe('LiftRootController', () => {
  let app: INestApplication
  let controller: LiftRootController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiftRootController],
      providers: [{ provide: LiftRootService, useValue: {} }],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    controller = app.get<LiftRootController>(LiftRootController)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
