import { Address } from 'src/Address/address.entity';
import { Cart } from 'src/Cart/cart.entity';
import { Order } from 'src/Order/order.entity';
import { Payment } from 'src/Payment/payment.entity';
import { Review } from 'src/Reviews/review.entity';
import { Shipping } from 'src/Shipping/shipping.entity';
import { Wishlist } from 'src/Wishlist/wishlist.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist[];

  @OneToMany(() => Address, (addresses) => addresses.user)
  addresses: Address[];

  @OneToMany(() => Payment, (payments) => payments.user)
  payments: Payment[];

  @OneToMany(() => Shipping, (shipping) => shipping.user)
  shipping: Shipping[];

  @OneToMany(() => Review, (reviews) => reviews.user)
  reviews: Review[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
