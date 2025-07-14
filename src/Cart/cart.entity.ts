import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from "src/Users/user.entity";
import { CartItem } from "./cart-item.entity";

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.carts)
  user: User;

  @OneToMany(() => CartItem, item => item.cart, { cascade: true })
  items: CartItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

