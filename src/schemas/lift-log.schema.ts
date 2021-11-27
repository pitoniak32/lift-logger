import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type LiftLogDocument = LiftLog & Document

@Schema()
export class LiftLog {
  @Prop()
  title: string

  @Prop()
  content: string
}

export const LiftLogSchema = SchemaFactory.createForClass(LiftLog)
