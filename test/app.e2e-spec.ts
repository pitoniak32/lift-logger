import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { LiftLogController } from '../src/api/controllers/lift-log/lift-log.controller'
import { LiftRootController } from '../src/api/controllers/lift-root/lift-root.controller'
import { UserController } from '../src/api/controllers/user/user.controller'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()

    await app.init()
  })

  afterAll(async () => { await app.close() })

  it('should be defined', () => {
    expect(app.get<LiftLogController>(LiftLogController)).toBeDefined()
    expect(app.get<LiftRootController>(LiftRootController)).toBeDefined()
    expect(app.get<UserController>(UserController)).toBeDefined()
  })
})
