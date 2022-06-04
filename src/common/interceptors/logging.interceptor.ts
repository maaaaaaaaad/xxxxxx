import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url, ip } = context.getArgByIndex(0);
    this.logger.log(`Request to ${method} ${url} ${ip}`);

    return next
      .handle()
      .pipe(
        tap(
          (data) =>
            data &&
            this.logger.log(
              `Response from ${method} ${url} ${ip} response: ${JSON.stringify(
                data,
              )}`,
            ),
        ),
      );
  }
}
