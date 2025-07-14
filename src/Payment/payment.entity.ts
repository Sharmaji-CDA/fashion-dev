import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { User } from 'src/Users/user.entity';
import { Order } from 'src/Order/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  payment_method: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'completed' | 'failed';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Order, (order) => order.payments, { onDelete: 'CASCADE' })
  order: Order;
}
