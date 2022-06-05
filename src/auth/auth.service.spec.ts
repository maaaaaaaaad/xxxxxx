import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { UserRegisterInputDto } from './dtos/user.register.dto';
import { ConflictException } from '@nestjs/common';

const dto: UserRegisterInputDto = {
  email: 'mock@gmail.com',
  password: 'mock123',
};

const fakeUsersModel = {
  exists: jest.fn(),
  save: jest.fn().mockResolvedValue(Users),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(Users.name),
          useValue: fakeUsersModel,
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    fakeUsersModel.exists.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('email already to exists', async () => {
      fakeUsersModel.exists.mockResolvedValue(dto.email);
      try {
        await service.register(dto);
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }
    });

    it('should called the save', async () => {
      const result = await service.register(dto);
      console.log(result);
    });
  });
});
