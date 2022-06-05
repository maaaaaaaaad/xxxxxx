import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { UserRegisterInputDto } from './dtos/user.register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersRepository: Model<Users>,
  ) {}

  async register({ email, password }: UserRegisterInputDto) {
    const exists = await this.usersRepository.exists({ email });
    if (exists) throw new ConflictException('User already to exists');
    try {
      return await new this.usersRepository({ email, password }).save();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
