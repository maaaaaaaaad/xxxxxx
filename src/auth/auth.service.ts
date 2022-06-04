import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { UserRegisterInputDto } from './dtos/user.register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersRepository: Model<Users>,
    private readonly logger: Logger,
  ) {}

  async register({ email, password }: UserRegisterInputDto) {
    const user = await this.usersRepository.exists({ email });
    if (!user) {
      throw new NotFoundException();
    }
    this.logger.log(user);
  }
}
