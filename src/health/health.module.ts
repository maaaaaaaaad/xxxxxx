import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthService } from './health.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [],
  providers: [HealthService],
})
export class HealthModule {}
