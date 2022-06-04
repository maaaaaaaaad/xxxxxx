import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';

interface HashPassword extends Document {
  password: string;
}

@Schema({ timestamps: true })
export class Users {
  @Prop({
    required: [true, 'User email required'],
    unique: true,
    index: true,
  })
  @IsEmail()
  email: string;

  @Prop({
    required: [true, 'User password required'],
    validate: {
      validator: (v: string): boolean => /(?=.*\d)(?=.*[a-z]).{8,}/.test(v),
      message: 'Password is a combination of 8 or more numbers and letters.',
    },
  })
  @Matches(/(?=.*\d)(?=.*[a-z]).{8,}/, {
    message: 'Password is a combination of 8 or more numbers and letters.',
  })
  @IsNotEmpty()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(
  Users,
).pre<HashPassword>('save', async function (next: NextFunction) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
