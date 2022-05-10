import { INestApplication } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../../../services/auth/auth.service'
import { ConfigModule, ConfigService } from '../../../config'
import { UserService } from '../../../services/user/user.service'
import { UserController } from './user.controller'

jest.setTimeout(10000)

describe('UserController', () => {
  let controller: UserController
  let app: INestApplication

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useExisting: ConfigService,
        }),
      ],
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: {} },
        { provide: AuthService, useValue: {} },
      ],
    }).compile()

    app = await module.createNestApplication().init()

    controller = module.get<UserController>(UserController)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('login', () => {
    it('should respond with jwt token after user is logged in', async () => {
      // Arrange
      controller['authService'].login = jest.fn().mockResolvedValue('test-jwt')

      // Act
      const result = await controller.login({} as any)

      // Assert
      expect(result).toEqual('test-jwt')
    })
  })

  describe('createUserLog', () => {
    it('should ', async () => {})
  })

  describe('getUsers', () => {
    it('should ', async () => {})
  })

  describe('getOneUser', () => {
    it('should ', async () => {})
  })

  describe('deleteOneUser', () => {
    it('should ', async () => {})
  })
})
