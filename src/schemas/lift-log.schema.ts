import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { LiftLogGroup, LiftLogItem } from './lift-log.component'

export type LiftLogRootDocument = LiftLogRoot & Document

@Schema()
export class LiftLogRoot {

  @Prop([LiftLogItem])
  liftLogGroups: LiftLogGroup[]
}

export const LiftLogRootSchema = SchemaFactory.createForClass(LiftLogRoot)
