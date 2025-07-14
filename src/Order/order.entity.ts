import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/Users/user.entity';
import { OrderItem } from './order-item.entity';
import { Payment } from 'src/Payment/payment.entity';
import { Shipping } from 'src/Shipping/shipping.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE', eager: true })
  user: User;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' })
  status: string;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true, eager: true })
  items: OrderItem[];

  @OneToMany(() => Payment, payments => payments.user)
  payments: Payment[];

  @OneToMany(() => Shipping, (shipping) => shipping.order)
  shipping: Shipping[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
