import { IsNotEmpty, IsInt, Min, Max, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}
