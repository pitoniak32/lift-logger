import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type LiftRootDocument = LiftRoot & Document

@Schema()
export class LiftRoot {
  @Prop()
  userId: string

  @Prop()
  label: string

  @Prop()
  createdAt: number

  @Prop()
  updatedAt: number

  @Prop()
  currentPrLogId: string
}

export const LiftRootSchema = SchemaFactory.createForClass(LiftRoot)
