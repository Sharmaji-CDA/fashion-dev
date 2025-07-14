import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { User } from 'src/Users/user.entity';
import { Product } from 'src/Product/product.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, User, Product])],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
