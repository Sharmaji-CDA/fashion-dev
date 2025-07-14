import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './payment.entity';
import { User } from 'src/Users/user.entity';
import { Order } from 'src/Order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Order])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
