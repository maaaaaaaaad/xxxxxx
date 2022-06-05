import { PickType } from '@nestjs/swagger';
import { Users } from '../schemas/users.schema';
import { BaseOutputDto } from '../../common/dtos/base.output.dto';

export class UserRegisterInputDto extends PickType(Users, [
  'email',
  'password',
]) {}

export class UserRegisterOutputDto extends BaseOutputDto<Users> {}
