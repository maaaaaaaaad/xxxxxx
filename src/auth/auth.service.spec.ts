import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRegisterInputDto } from './dtos/user.register.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';

const dto: UserRegisterInputDto = {
  email: 'mock@gmail.com',
  password: 'mock123',
};

const mockData = [{ email: 'mock@gmail.com' }];

const MockUsersRepository = {
  findOne: jest.fn().mockImplementation((dto: string) => {
    const find = mockData.find((v) => v.email === dto['email']);
    if (find) throw new ConflictException('User already to exists');
    return find;
  }),

  save: jest.fn().mockImplementation(() => {
    return {
      data: dto,
    };
  }),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: MockUsersRepository,
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('email already to exists', () => {
      expect(service.register(dto)).rejects.toBeInstanceOf(ConflictException);
    });

    it('should success register', async () => {
      try {
        const result = await service.register({
          email: 'success@gmail.com',
          password: 'success',
        });
        await expect(result).resolves.toBeDefined();
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
