import { PaginationInputDto } from '../../common/dtos/pagination.dto';
import { BaseOutputDto } from '../../common/dtos/base.output.dto';
import { UsersEntity } from '../entities/user.entity';

type UserList = {
  users: UsersEntity[];
  count: number;
  totalPage: number;
};

export class UserListInputDto extends PaginationInputDto {}

export class UserListOutputDto extends BaseOutputDto<UserList> {}
