import { Product } from 'src/Product/product.entity';
import { User } from 'src/Users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity('wishlist')
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wishlist, { onDelete: 'CASCADE', eager: false })
  user: User;

  @ManyToOne(() => Product, (product) => product.wishlist, { onDelete: 'CASCADE', eager: false })
  product: Product;

  @CreateDateColumn()
  created_at: Date;
}
