import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class Users extends Document {
  @Prop({ isRequired: true, unique: true, index: true })
  @IsEmail()
  email: string;

  @Prop({ isRequired: true })
  @IsString()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
