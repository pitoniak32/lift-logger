import { INestApplication } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { appendFile } from 'fs'
import { ConfigModule, ConfigService } from '../../../config'
import { LiftLog, LiftLogSchema } from '../../../schemas/lift-log.schema'
import { LiftLogService } from './lift-log.service'

describe('LiftLogService', () => {
  let app: INestApplication
  let service: LiftLogService

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
            name: LiftLog.name,
            schema: LiftLogSchema,
          },
        ]),
      ],
      providers: [LiftLogService],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    service = module.get<LiftLogService>(LiftLogService)
    await service['liftLogModel'].deleteMany()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
