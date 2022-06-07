import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationInputDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ required: true, nullable: false, type: Number, default: 1 })
  page = 1;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ required: true, nullable: false, type: Number, default: 1 })
  size = 1;
}
