import { INestApplication } from '@nestjs/common'
// import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '../../config/config.module'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let app: INestApplication
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        AuthService,
        { provide: UserService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    service = module.get<AuthService>(AuthService)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // describe('validateUser', () => {
  //   it('should return user with the password removed if provided password matches stored password', async () => {
  //     // Arrange
  //     service['userService'].findOneForAuth = jest.fn().mockResolvedValue({
  //       username: 'test-username',
  //       password: bcrypt.hashSync('test-password', 10),
  //     })

  //     // Act
  //     const user = await service.validateUser('test-username', 'test-password')

  //     // Arrange
  //     expect(user).toEqual({ username: 'test-username' })
  //   })

  //   it('should return null when the password provided does not match stored password', async () => {
  //     // Arrange
  //     service['userService'].findOneForAuth = jest.fn().mockResolvedValue({
  //       username: 'test-username',
  //       password: bcrypt.hashSync('test-password', 10),
  //     })

  //     // Act
  //     const user = await service.validateUser('test-username', 'wrong-password')

  //     // Arrange
  //     expect(user).toEqual(null)
  //   })
  // })

  // describe('login', () => {
  //   it('should return user with the password removed if provided password matches stored password', async () => {
  //     // Arrange
  //     service['jwtService'].sign = jest.fn().mockReturnValue('test-jwt')

  //     // Act
  //     const jwt = await service.login({
  //       username: 'test-username',
  //       userId: 'test-id',
  //     })

  //     // Arrange
  //     expect(jwt).toEqual({ access_token: 'test-jwt' })
  //   })
  // })
})
