import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/Users/user.entity';
import { Product } from 'src/Product/product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.reviews, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE' })
  product: Product;
}
