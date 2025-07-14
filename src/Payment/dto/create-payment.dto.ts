import { IsNumber, IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @IsEnum(['pending', 'completed', 'failed'])
  status: 'pending' | 'completed' | 'failed';
}
