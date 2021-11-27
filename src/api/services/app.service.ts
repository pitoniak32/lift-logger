import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LiftLog, LiftLogDocument } from '../../schemas/lift-log.schema';
import { CreateLiftLogDto } from '../resources/create-lift-log.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(LiftLog.name) private liftLogModel: Model<LiftLogDocument>) {}

  async createLiftLog(createLiftLog: CreateLiftLogDto): Promise<string> {
    await new this.liftLogModel({ title: createLiftLog.title, content: createLiftLog.content }).save()
    return 'created'
  }

  async getLiftLogs(): Promise<LiftLogDocument[]> {
    return await this.liftLogModel.find()
  }

  async getOneLiftLog(title: string): Promise<LiftLogDocument[]> {
    return await this.liftLogModel.find({ title })
  }

  async deleteLiftLog(id: string): Promise<string> {
    await this.liftLogModel.findByIdAndDelete(id)
    return 'deleted'
  }
}
