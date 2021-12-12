import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../api/services/user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user with the password removed if provided password matches stored password', async () => {
      // Arrange
      service['userService'].findOneForAuth = jest.fn().mockResolvedValue({
        username: 'test-username',
        password: bcrypt.hashSync('test-password', 10)
      })

      // Act
      const user = await service.validateUser('test-username', 'test-password')

      // Arrange
      expect(user).toEqual({ username: 'test-username' })
    })

    it('should return null when the password provided does not match stored password', async () => {
      // Arrange
      service['userService'].findOneForAuth = jest.fn().mockResolvedValue({
        username: 'test-username',
        password: bcrypt.hashSync('test-password', 10)
      })

      // Act
      const user = await service.validateUser('test-username', 'wrong-password')

      // Arrange
      expect(user).toEqual(null)
    })
  })

  describe('login', () => {
    it('should return user with the password removed if provided password matches stored password', async () => {
      // Arrange
      service['jwtService'].sign = jest.fn().mockReturnValue('test-jwt')

      // Act
      const jwt = await service.login({ username: 'test-username', userId: 'test-id' })

      // Arrange
      expect(jwt).toEqual({ access_token: 'test-jwt' })
    })
  })
});
