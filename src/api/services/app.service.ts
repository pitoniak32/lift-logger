import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LiftLogRoot, LiftLogRootDocument } from '../../schemas/lift-log.schema'
import { CreateLiftLogRootDto, UpdateLiftLogRootDto } from '../resources/create-lift-log-root.dto'

@Injectable()
export class AppService {
  constructor(
    @InjectModel(LiftLogRoot.name) private liftLogModel: Model<LiftLogRootDocument>,
  ) {}

  async createRootLiftLog(
    createLiftLogRoot: CreateLiftLogRootDto,
  ): Promise<LiftLogRootDocument> {
    return await new this.liftLogModel(createLiftLogRoot).save()
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

  async updateOneRootLiftLog(id: string, updateLiftLogRoot: UpdateLiftLogRootDto) {
    return await this.liftLogModel.findByIdAndUpdate(
      id,
      updateLiftLogRoot,
    ).clone()
  }
}
