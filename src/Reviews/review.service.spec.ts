import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { User } from 'src/Users/user.entity';
import { Product } from 'src/Product/product.entity';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: getRepositoryToken(Review), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: getRepositoryToken(Product), useValue: {} },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
