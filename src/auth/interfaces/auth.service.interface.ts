import {
  UserRegisterInputDto,
  UserRegisterOutputDto,
} from '../dtos/user.register.dto';
import { PaginationInputDto } from '../../common/dtos/pagination.dto';
import { UserListOutputDto } from '../dtos/user.list.dto';

export interface IAuthService {
  register: (
    userRegisterInputDto: UserRegisterInputDto,
  ) => Promise<UserRegisterOutputDto>;
  list: (paginationInputDto: PaginationInputDto) => Promise<UserListOutputDto>;
}
