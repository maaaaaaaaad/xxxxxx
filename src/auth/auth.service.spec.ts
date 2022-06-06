import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { UserRegisterInputDto } from './dtos/user.register.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

const dto: UserRegisterInputDto = {
  email: 'mock@gmail.com',
  password: 'mock123',
};

const mockData = [{ email: 'mock@gmail.com' }];

const MockUsersRepository = {
  exists: jest.fn().mockImplementation((dto: string) => {
    const find = mockData.find((v) => v.email === dto['email']);
    if (find) throw new ConflictException();
    return null;
  }),

  save: jest.fn().mockImplementation(() => {
    return {
      result: dto,
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
          provide: getModelToken(Users.name),
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
