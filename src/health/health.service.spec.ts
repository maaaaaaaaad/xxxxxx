import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

class MockIndicator {}
class MockCheck {}

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: HttpHealthIndicator,
          useClass: MockIndicator,
        },
        {
          provide: HealthCheckService,
          useClass: MockCheck,
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
