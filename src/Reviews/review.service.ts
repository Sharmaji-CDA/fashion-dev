import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/Users/user.entity';
import { Product } from 'src/Product/product.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateReviewDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });

    const review = this.reviewRepo.create({
      rating: dto.rating,
      comment: dto.comment,
      user,
      product,
    }as Partial<Review>);

    return this.reviewRepo.save(review);
  }

  findAll() {
    return this.reviewRepo.find({ relations: ['user', 'product'] });
  }

  findOne(id: number) {
    return this.reviewRepo.findOne({ where: { id }, relations: ['user', 'product'] });
  }

  async update(id: number, dto: UpdateReviewDto) {
    await this.reviewRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.reviewRepo.delete(id);
    return { message: 'Review deleted successfully' };
  }
}
