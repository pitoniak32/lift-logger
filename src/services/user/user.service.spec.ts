import { INestApplication } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '../../config'
import { User, UserSchema } from '../../schemas/user.schema'
import { UserService } from './user.service'

describe('UserService', () => {
  let app: INestApplication
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useExisting: ConfigService,
        }),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [UserService],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    service = app.get<UserService>(UserService)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
