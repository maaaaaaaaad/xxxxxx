import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import {
  UserRegisterInputDto,
  UserRegisterOutputDto,
} from './dtos/user.register.dto';
import { PaginationInputDto } from '../common/dtos/pagination.dto';
import { UserListOutputDto } from './dtos/user.list.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersRepository: Model<Users>,
  ) {}

  async register({
    email,
    password,
  }: UserRegisterInputDto): Promise<UserRegisterOutputDto> {
    const exists = await this.usersRepository.exists({ email });
    if (exists) throw new ConflictException('User already to exists');
    try {
      return {
        data: await new this.usersRepository({ email, password }).save(),
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async list({ page, size }: PaginationInputDto): Promise<UserListOutputDto> {
    try {
      const [users, count] = await Promise.all([
        this.usersRepository
          .find({})
          .limit(size)
          .skip((page - 1) * size),
        this.usersRepository.count(),
      ]);
      return {
        data: {
          users,
          count,
          totalPage: Math.ceil(count / size),
        },
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
