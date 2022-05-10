import { INestApplication } from '@nestjs/common'
import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '../../../config'
import { LiftLog } from '../../../schemas/lift-log.schema'
import { LiftRoot, LiftRootSchema } from '../../../schemas/lift-root.schema'
import { LiftRootService } from './lift-root.service'

describe('AppService', () => {
  let app: INestApplication
  let service: LiftRootService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useExisting: ConfigService,
        }),
        MongooseModule.forFeature([
          {
            name: LiftRoot.name,
            schema: LiftRootSchema,
          },
        ]),
      ],
      providers: [
        LiftRootService,
        {
          provide: getModelToken(LiftLog.name),
          useValue: {},
        },
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    service = app.get<LiftRootService>(LiftRootService)

    await service['liftRootModel'].deleteMany()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // describe('', () => {
  //   it('should ', () => {
  //     // Arrange
  //     // Act
  //     // Assert
  //   })
  // })
})
