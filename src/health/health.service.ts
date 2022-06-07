import { Injectable } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class HealthService {
  constructor(
    private http: HttpHealthIndicator,
    private health: HealthCheckService,
  ) {}

  async pingCheck() {
    return await this.http.pingCheck(
      'pro-swagger',
      'http://127.0.0.1:8888/docs',
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async healthCheck() {
    return await this.health.check([() => this.pingCheck()]);
  }
}
