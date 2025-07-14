import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

describe('ProductService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  const mockProductRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepo,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const products = [{ id: 1, name: 'Shirt' }];
    mockProductRepo.find.mockResolvedValue(products);

    expect(await service.findAll()).toEqual(products);
  });

  it('should create a product', async () => {
    const dto = { name: 'Shirt', price: 100 };
    const product = { id: 1, ...dto };

    mockProductRepo.create.mockReturnValue(product);
    mockProductRepo.save.mockResolvedValue(product);

    expect(await service.create(dto as any)).toEqual(product);
  });
});
