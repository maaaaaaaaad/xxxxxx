import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url, ip } = context.getArgByIndex(0);
    console.log(`Request to ${method} ${url} ${ip}`);

    return next
      .handle()
      .pipe(
        tap((data) =>
          console.log(
            `Response from ${method} ${url} ${ip} response: ${JSON.stringify(
              data,
            )}`,
          ),
        ),
      );
  }
}
