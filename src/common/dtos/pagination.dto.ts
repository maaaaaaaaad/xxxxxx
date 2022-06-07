import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginationInputDto {
  @IsNumber()
  @IsNotEmpty()
  page = 1;

  @IsNumber()
  @IsNotEmpty()
  size = 1;
}
