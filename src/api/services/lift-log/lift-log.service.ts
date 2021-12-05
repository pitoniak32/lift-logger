import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LiftLog, LiftLogDocument } from '../../../schemas/lift-log.schema';
import { LiftLogDto } from '../../resources/lift-log.dto';
import { ViewLiftLogDto } from '../../resources/view-lift-log.dto';

@Injectable()
export class LiftLogService {
  private readonly logger = new Logger(LiftLogService.name)

  constructor(
    @InjectModel(LiftLog.name)
    private liftLogModel: Model<LiftLogDocument>,
  ) {}

  async createLiftLog(
    createLiftLog: LiftLogDto,
  ): Promise<ViewLiftLogDto> {
    const dateNow = new Date()
    return await new this.liftLogModel({ ...createLiftLog, createdAt: dateNow, updatedAt: dateNow }).save()
  }

  async getLiftLogs(): Promise<ViewLiftLogDto[]> {
    this.logger.log('getting all lift logs...')
    return await this.liftLogModel.find()
  }

  async getOneLiftLog(id: string): Promise<ViewLiftLogDto> {
    this.logger.log(`getting one lift log with id: ${id}...`)
    return await this.liftLogModel.findById(id)
  }

  async deleteOneLiftLog(id: string): Promise<ViewLiftLogDto> {
    this.logger.log(`deleting one lift log with id: ${id}...`)
    return await this.liftLogModel.findByIdAndDelete(id)
  }
} 
