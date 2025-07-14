import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from 'src/Users/user.entity';
import { Product } from 'src/Product/product.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist) private wishlistRepo: Repository<Wishlist>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateWishlistDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });

    const wishlist = this.wishlistRepo.create({ user: {id: dto.userId}, product: {id: dto.productId} });
    return this.wishlistRepo.save(wishlist);
  }

  findAll() {
    return this.wishlistRepo.find({ relations: ['user', 'product'] });
  }

  findByUser(userId: number) {
    return this.wishlistRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async remove(id: number) {
    await this.wishlistRepo.delete(id);
    return { message: 'Item removed from wishlist' };
  }
}
