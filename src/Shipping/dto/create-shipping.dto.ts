import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateShippingDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: '123 Main St, Springfield' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 'Agra' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: '205151' })
  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @ApiProperty({ example: 'India' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: 'delivered', enum: ['pending', 'shipped', 'delivered', 'cancelled'] })
  @IsOptional()
  @IsEnum(['pending', 'shipped', 'delivered', 'cancelled'])
  shipping_status?: 'pending' | 'shipped' | 'delivered' | 'cancelled';

  @ApiProperty({ example: 'a'})
  @IsOptional()
  @IsString()
  tracking_number?: string;

  @ApiProperty({ example: '8:00:00 AM'})
  @IsOptional()
  @IsDateString()
  estimated_delivery_date?: Date;
}
