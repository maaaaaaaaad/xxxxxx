import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { OutputInterceptor } from '../common/interceptors/output.interceptor';
import {
  UserRegisterInputDto,
  UserRegisterOutputDto,
} from './dtos/user.register.dto';
import { UserListInputDto, UserListOutputDto } from './dtos/user.list.dto';
import { IAuthService } from './interfaces/auth.service.interface';

@Controller('auth')
@UseInterceptors(OutputInterceptor)
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: IAuthService,
  ) {}
  @Post()
  async register(
    @Body() userRegisterInputDto: UserRegisterInputDto,
  ): Promise<UserRegisterOutputDto> {
    return await this.authService.register(userRegisterInputDto);
  }

  @Get('list')
  async list(
    @Query() userListInputDto: UserListInputDto,
  ): Promise<UserListOutputDto> {
    return await this.authService.list(userListInputDto);
  }
}
