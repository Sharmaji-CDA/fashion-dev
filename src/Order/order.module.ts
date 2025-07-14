import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { User } from 'src/Users/user.entity';
import { Product } from 'src/Product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
