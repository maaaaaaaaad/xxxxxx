import { PickType } from '@nestjs/swagger';
import { Users } from '../schemas/users.schema';

export class UserRegisterInputDto extends PickType(Users, [
  'email',
  'password',
]) {}
