import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type LiftLogDocument = LiftLog & Document

@Schema()
export class LiftLog {
  @Prop()
  userId: string

  @Prop()
  liftId: string

  @Prop()
  title: string

  @Prop()
  createdAt: number

  @Prop()
  updatedAt: number

  @Prop()
  notes: string

  @Prop()
  location: string
}

export const LiftLogSchema = SchemaFactory.createForClass(LiftLog)
