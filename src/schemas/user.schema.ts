import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  email: string

  @Prop()
  createdAt: number

  @Prop()
  updatedAt: number

  @Prop()
  weight: number

  @Prop()
  height: number
}

export const UserSchema = SchemaFactory.createForClass(User)
