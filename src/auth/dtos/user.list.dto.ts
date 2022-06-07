import { PaginationInputDto } from '../../common/dtos/pagination.dto';
import { BaseOutputDto } from '../../common/dtos/base.output.dto';
import { Users } from '../schemas/users.schema';

type UserList = {
  users: Users[];
  count: number;
  totalPage: number;
};

export class UserListInputDto extends PaginationInputDto {}

export class UserListOutputDto extends BaseOutputDto<UserList> {}
