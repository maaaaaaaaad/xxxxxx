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

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(Users.name),
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    let mockRegister;
    it('the email already to exists', async () => {
      mockRegister = jest
        .spyOn(service, 'register')
        .mockRejectedValue(new ConflictException());
      try {
        await service.register(dto);
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }
    });

    it('should register', async () => {
      mockRegister = jest
        .spyOn(service, 'register')
        .mockResolvedValue(Promise.resolve({ result: dto }));
      const result = await service.register(dto);
      expect(mockRegister).toBeCalledTimes(1);
      expect(mockRegister).toHaveBeenCalledTimes(1);
      await expect(result).toMatchObject({
        result: dto,
      });
    });
  });
});
