import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LiftLogRoot, LiftLogRootDocument } from '../../schemas/lift-log.schema'
import { CreateLiftLogGroupDto } from '../resources/create-lift-log-group.dto'
import { UpdateLiftLogGroupDto } from '../resources/update-lift-log-group.dto'

@Injectable()
export class AppService {
  constructor(
    @InjectModel(LiftLogRoot.name) private liftLogModel: Model<LiftLogRootDocument>,
  ) {}

  async createRootLiftLog(
    createLiftLogGroup: CreateLiftLogGroupDto,
  ): Promise<LiftLogRootDocument> {
    return await new this.liftLogModel({
      liftLogGroups: [createLiftLogGroup]
    }).save()
  }

  async getRootLiftLogs(): Promise<LiftLogRootDocument[]> {
    return await this.liftLogModel.find()
  }

  async getOneRootLiftLog(id: string): Promise<LiftLogRootDocument> {
    return await this.liftLogModel.findById(id)
  }

  async deleteOneRootLiftLog(id: string): Promise<LiftLogRootDocument> {
    return await this.liftLogModel.findByIdAndDelete(id)
  }

  async updateOneLiftLogGroup(id: string, updateLiftLogGroup: UpdateLiftLogGroupDto) {
    return await this.liftLogModel.findByIdAndUpdate(
      id,
      { liftLogGroups: [updateLiftLogGroup] },
    ).clone()
  }
}
