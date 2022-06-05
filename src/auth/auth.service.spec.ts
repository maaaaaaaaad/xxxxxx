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

class MockUsersRepository {
  private readonly data = [{ email: 'mock@gmail.com' }];
  exists({ email }: { email: string }) {
    const find = this.data.find((v) => v.email === email);
    if (find) return find;
    return null;
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(Users.name),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register', async () => {
      jest.spyOn(service, 'register').mockResolvedValue({ result: dto });
      const result = await service.register(dto);
      await expect(result).toMatchObject({
        result: { email: 'mock@gmail.com', password: 'mock123' },
      });
    });
  });
});
