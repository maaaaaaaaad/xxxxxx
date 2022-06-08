import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  UserRegisterInputDto,
  UserRegisterOutputDto,
} from './dtos/user.register.dto';
import { PaginationInputDto } from '../common/dtos/pagination.dto';
import { UserListOutputDto } from './dtos/user.list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async register({
    email,
    password,
  }: UserRegisterInputDto): Promise<UserRegisterOutputDto> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('User already to exists');
    try {
      return {
        data: await this.usersRepository.save(
          this.usersRepository.create({ email, password }),
        ),
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async list({ page, size }: PaginationInputDto): Promise<UserListOutputDto> {
    try {
      const [users, count] = await this.usersRepository.findAndCount({
        take: size,
        skip: (page - 1) * size,
        order: {
          createAt: 'DESC',
        },
      });
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
