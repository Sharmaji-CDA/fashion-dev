import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/Users/user.entity';
import { Order } from 'src/Order/order.entity';

@Entity()
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.shipping, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Order, (order) => order.shipping, { onDelete: 'CASCADE' })
  order: Order;

  @Column('text')
  address: string;

  @Column()
  city: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;

  @Column({ type: 'enum', enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' })
  shipping_status: 'pending' | 'shipped' | 'delivered' | 'cancelled';

  @Column({ nullable: true })
  tracking_number: string;

  @Column({ type: 'date', nullable: true })
  estimated_delivery_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
