import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { User } from 'src/Users/user.entity';
import { Order } from 'src/Order/order.entity';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Order) private orderRepo: Repository<Order>
  ) {}

  async create(dto: CreatePaymentDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    const order = await this.orderRepo.findOne({ where: { id: dto.orderId } });

    const payment = this.paymentRepo.create({
      amount: dto.amount,
      payment_method: dto.payment_method,
      status: dto.status,
      user: user,
      order: order,
    }as Partial<Payment>);

    return this.paymentRepo.save(payment);
  }

  findAll() {
    return this.paymentRepo.find({ relations: ['user', 'order'] });
  }

  findOne(id: number) {
    return this.paymentRepo.findOne({ where: { id }, relations: ['user', 'order'] });
  }

  async update(id: number, dto: UpdatePaymentDto) {
    await this.paymentRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.paymentRepo.delete(id);
    return { message: 'Payment record deleted' };
  }
}
