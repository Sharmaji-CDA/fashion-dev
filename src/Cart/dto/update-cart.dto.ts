import { IsOptional, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateCartItemDto {
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  price?: number;
}

export class UpdateCartDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCartItemDto)
  items?: UpdateCartItemDto[];
}
