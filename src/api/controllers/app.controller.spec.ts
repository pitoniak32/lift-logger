import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from '../services/app.service'
import { CreateLiftLogDto } from '../resources/create-lift-log.dto'
import { ViewLiftLogDto } from '../resources/view-lift-log.dto'

describe('AppController', () => {
  let appController: AppController
  let testCreatedLiftLog: CreateLiftLogDto
  let testViewLiftLog: ViewLiftLogDto

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide:
          AppService,
          useValue: {
            createLiftLog: jest.fn(),
            getLiftLogs: jest.fn(),
            getOneLiftLog: jest.fn(),
            deleteOneLiftLog: jest.fn(),
          },
        },
      ],
    }).compile()

    appController = app.get<AppController>(AppController);

    testCreatedLiftLog = {
      title: 'test-title',
      content: 'test-content',
    }

    testViewLiftLog  = {
      title: 'test-title',
      content: 'test-content'
    }
  })

  describe('createLiftLog', () => {
    it('should return ViewLiftLogDto with correct values', async () => {
      // Arrange
      appController['appService'].createLiftLog = jest.fn().mockResolvedValue(testCreatedLiftLog)

      // Act
      const response = await appController.createLiftLog(testCreatedLiftLog)

      // Assert
      expect(response).toEqual(testViewLiftLog)
    })
  })

  describe('getLiftLogs', () => {
    it('should return list of logs with correct values', async () => {
      // Arrange
      appController['appService'].getLiftLogs = jest.fn().mockResolvedValue([testCreatedLiftLog, testCreatedLiftLog])

      // Act
      const response = await appController.getLiftLogs()

      // Assert
      expect(response).toHaveLength(2)
      expect(response).toEqual([testViewLiftLog, testViewLiftLog])
    })
  })

  describe('getOneLiftLog', () => {
    it('should return one lift log with correct values', async () => {
      // Arrange
      appController['appService'].getOneLiftLog = jest.fn().mockResolvedValue(testCreatedLiftLog)

      // Act
      const response = await appController.getOneLiftLog('test-id')

      // Assert
      expect(response).toEqual(testViewLiftLog)
    })
  })

  describe('deleteOneLiftLog', () => {
    it('should delete one lift log', async () => {
      // Arrange
      appController['appService'].deleteOneLiftLog = jest.fn().mockResolvedValue(testCreatedLiftLog)

      // Act
      const response = await appController.deleteOneLiftLog('test-id')

      // Assert
      expect(response).toEqual(testViewLiftLog)
    })
  })
})
