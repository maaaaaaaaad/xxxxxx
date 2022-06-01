import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

@Schema({ timestamps: true })
export class Users extends Document {
  @Prop({ required: [true, 'User email required'], unique: true, index: true })
  @IsEmail()
  email: string;

  @Prop({ required: [true, 'User password required'] })
  @Matches(/(?=.*\d)(?=.*[a-z]).{8,}/, {
    message: 'Password is a combination of 8 or more numbers and letters.',
  })
  @IsNotEmpty()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
