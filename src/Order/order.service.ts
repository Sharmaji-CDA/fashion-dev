import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './order-item.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/Users/user.entity';
import { Product } from 'src/Product/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) {
       throw new NotFoundException('User not found');
    }
    const order = this.orderRepo.create({ user, totalAmount: dto.totalAmount });
    await this.orderRepo.save(order);

    const savedOrder = await this.orderRepo.save(order);
    const items: OrderItem[] = [];

    let total = 0;

    for (const item of dto.items) {
      const product = await this.productRepo.findOneBy({ id: item.productId });
      if (!product) throw new NotFoundException('Product not found');

      const orderItem = this.orderItemRepo.create({
        order: order,
        product: product,
        quantity: item.quantity,
        price: item.price
      });
      total += item.quantity * item.price;
      items.push(orderItem);
    }

    await this.orderItemRepo.save(items);
    savedOrder.items = items;
    savedOrder.totalAmount = total;

    return this.orderRepo.save(savedOrder);
  }

  findAll() {
    return this.orderRepo.find({ relations: ['items', 'items.product', 'user'] });
  }

  findOne(id: number) {
    return this.orderRepo.findOne({ where: { id }, relations: ['items', 'items.product', 'user'] });
  }

  async update(id: number, dto: UpdateOrderDto) {
    await this.orderRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.orderRepo.delete(id);
    return { message: 'Order deleted successfully' };
  }
}
