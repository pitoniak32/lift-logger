import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../../../services/auth/auth.service'
import { UserService } from '../../../services/user/user.service'
import { UserController } from './user.controller'

describe('UserController', () => {
  let app: INestApplication
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: {} },
        { provide: AuthService, useValue: {} },
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    controller = app.get<UserController>(UserController)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
