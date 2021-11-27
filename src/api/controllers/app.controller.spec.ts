import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from '../services/app.service'
import { CreateLiftLogGroupDto } from '../resources/create-lift-log-group.dto'
import { ViewLiftLogGroupDto } from '../resources/view-lift-log.dto'

describe('AppController', () => {
  let appController: AppController
  let testCreateLiftLogGroup: CreateLiftLogGroupDto
  let testViewLiftLogGroup: ViewLiftLogGroupDto

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            createRootLiftLog: jest.fn(),
            getLiftLogs: jest.fn(),
            getOneLiftLog: jest.fn(),
            deleteOneLiftLog: jest.fn(),
          },
        },
      ],
    }).compile()

    appController = app.get<AppController>(AppController)

    const testDate = new Date()

    testCreateLiftLogGroup = {
      title: 'test-title',
      items: [{title: 'test-item-title', content: 'test-content', date: testDate}]
    }

    testViewLiftLogGroup = {
      title: 'test-title',
      items: [{title: 'test-item-title', content: 'test-content', date: testDate}]
    }
  })

  describe('createRootLiftLog', () => {
    it('should return ViewLiftLogDto with correct values', async () => {
      // Arrange
      appController['appService'].createRootLiftLog = jest
        .fn()
        .mockResolvedValue(testCreateLiftLogGroup)

      // Act
      const response = await appController.createRootLiftLog({ liftLogGroups: [testCreateLiftLogGroup] })

      // Assert
      expect(response).toEqual(testViewLiftLogGroup)
    })
  })

  describe('getRootLiftLogs', () => {
    it('should return list of logs with correct values', async () => {
      // Arrange
      appController['appService'].getRootLiftLogs = jest
        .fn()
        .mockResolvedValue([testCreateLiftLogGroup, testCreateLiftLogGroup])

      // Act
      const response = await appController.getLiftLogs()

      // Assert
      expect(response).toHaveLength(2)
      expect(response).toEqual([testViewLiftLogGroup, testViewLiftLogGroup])
    })
  })

  describe('getOneRootLiftLog', () => {
    it('should return one lift log with correct values', async () => {
      // Arrange
      appController['appService'].getOneRootLiftLog = jest
        .fn()
        .mockResolvedValue(testCreateLiftLogGroup)

      // Act
      const response = await appController.getOneLiftLog('test-id')

      // Assert
      expect(response).toEqual(testViewLiftLogGroup)
    })
  })

  describe('deleteOneRootLiftLog', () => {
    it('should delete one lift log', async () => {
      // Arrange
      appController['appService'].deleteOneRootLiftLog = jest
        .fn()
        .mockResolvedValue(testCreateLiftLogGroup)

      // Act
      const response = await appController.deleteOneLiftLog('test-id')

      // Assert
      expect(response).toEqual(testViewLiftLogGroup)
    })
  })
})
