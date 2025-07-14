import { Test, TestingModule } from '@nestjs/testing';
import { WishlistService } from './wishlist.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { User } from 'src/Users/user.entity';
import { Product } from 'src/Product/product.entity';
import { Repository } from 'typeorm';

describe('WishlistService', () => {
  let service: WishlistService;
  let wishlistRepo: Repository<Wishlist>;
  let userRepo: Repository<User>;
  let productRepo: Repository<Product>;

  const mockWishlistRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserRepo = {
    findOne: jest.fn(),
  };

  const mockProductRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishlistService,
        { provide: getRepositoryToken(Wishlist), useValue: mockWishlistRepo },
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: getRepositoryToken(Product), useValue: mockProductRepo },
      ],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
    wishlistRepo = module.get(getRepositoryToken(Wishlist));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a wishlist entry', async () => {
    const dto = { userId: 1, productId: 2 };
    const user = { id: 1 } as User;
    const product = { id: 2 } as Product;
    const wishlist = { id: 1, user, product } as Wishlist;

    mockUserRepo.findOne.mockResolvedValue(user);
    mockProductRepo.findOne.mockResolvedValue(product);
    mockWishlistRepo.create.mockReturnValue(wishlist);
    mockWishlistRepo.save.mockResolvedValue(wishlist);

    const result = await service.create(dto);
    expect(result).toEqual(wishlist);
    expect(mockUserRepo.findOne).toHaveBeenCalledWith({ where: { id: dto.userId } });
    expect(mockProductRepo.findOne).toHaveBeenCalledWith({ where: { id: dto.productId } });
  });

  it('should return all wishlist entries', async () => {
    const items = [{ id: 1 }, { id: 2 }] as Wishlist[];
    mockWishlistRepo.find.mockResolvedValue(items);
    const result = await service.findAll();
    expect(result).toEqual(items);
  });

  it('should delete a wishlist entry', async () => {
    mockWishlistRepo.delete.mockResolvedValue({});
    const result = await service.remove(1);
    expect(result).toEqual({ message: 'Item removed from wishlist' });
  });
});
