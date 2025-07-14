import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductService = {
    create: jest.fn(dto => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [{ id: 1, name: 'Shirt' }]),
    findOne: jest.fn(id => ({ id, name: 'Shirt' })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn(id => ({ deleted: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', () => {
    const dto: CreateProductDto = { name: 'Shirt', price: 1000 };
    expect(controller.create(dto)).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all products', () => {
    expect(controller.findAll()).toEqual([{ id: 1, name: 'Shirt' }]);
  });

  it('should return a product by id', () => {
    expect(controller.findOne('1')).toEqual({ id: 1, name: 'Shirt' });
  });

  it('should update a product', () => {
    const dto: UpdateProductDto = { name: 'T-Shirt' };
    expect(controller.update('1', dto)).toEqual({ id: 1, ...dto });
  });

  it('should delete a product', () => {
    expect(controller.remove('1')).toEqual({ deleted: true });
  });
});
