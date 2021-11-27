import { getModelToken } from "@nestjs/mongoose"
import { Test, TestingModule } from "@nestjs/testing"
import { LiftLog } from "../../schemas/lift-log.schema"
import { AppService } from "./app.service"

describe('AppService', () => {
  let service: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getModelToken(LiftLog.name),
          useValue: {},
        },
      ],
    }).compile()

    service = app.get<AppService>(AppService)
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