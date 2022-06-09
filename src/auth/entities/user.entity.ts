import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Entity({ name: 'USER' })
export class UsersEntity extends CoreEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  @Matches(/(?=.*\d)(?=.*[a-z]).{8,}/, {
    message: 'Password is a combination of 8 or more numbers and letters.',
  })
  @IsNotEmpty()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        throw new InternalServerErrorException(e.message);
      }
    }
  }

  async confirmPassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
