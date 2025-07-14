import { Test, TestingModule } from '@nestjs/testing';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';

describe('WishlistController', () => {
  let controller: WishlistController;
  let service: WishlistService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByUser: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [{ provide: WishlistService, useValue: mockService }],
    }).compile();

    controller = module.get<WishlistController>(WishlistController);
    service = module.get<WishlistService>(WishlistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a wishlist item', async () => {
    const dto = { userId: 1, productId: 2 };
    const result = { id: 1, ...dto };
    mockService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all wishlist items', async () => {
    const result = [{ id: 1 }, { id: 2 }];
    mockService.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
  });

  it('should return wishlist by user', async () => {
    const result = [{ id: 1 }];
    mockService.findByUser.mockResolvedValue(result);

    expect(await controller.findByUser('1')).toEqual(result);
  });

  it('should delete a wishlist item', async () => {
    const result = { message: 'Item removed from wishlist' };
    mockService.remove.mockResolvedValue(result);

    expect(await controller.remove('1')).toEqual(result);
  });
});
