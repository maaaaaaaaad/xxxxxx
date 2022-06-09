import { PickType } from '@nestjs/swagger';
import { BaseOutputDto } from '../../common/dtos/base.output.dto';
import { UsersEntity } from '../entities/user.entity';

export type UserRegisterOutputType = Pick<UsersEntity, 'id' | 'email'>;

export class UserRegisterInputDto extends PickType(UsersEntity, [
  'email',
  'password',
] as const) {}

export class UserRegisterOutputDto extends BaseOutputDto<UserRegisterOutputType> {}
