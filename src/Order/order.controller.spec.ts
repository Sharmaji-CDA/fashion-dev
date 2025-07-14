import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const dto: CreateOrderDto = {
      userId: 1,
      totalAmount: 100.00,
      items: [{ productId: 1, quantity: 2, price: 50 }],
    };

    const result = { id: 1, ...dto };
    jest.spyOn(service, 'create').mockResolvedValue(result as any);

    expect(await controller.create(dto)).toEqual(result);
  });

  it('should return all orders', async () => {
    const result = [{ id: 1 }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

    expect(await controller.findAll()).toEqual(result);
  });

  it('should return one order', async () => {
    const result = { id: 1 };
    jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

    expect(await controller.findOne('1')).toEqual(result);
  });

  it('should update an order', async () => {
    const dto: UpdateOrderDto = { status: 'confirmed' };
    const result = { id: 1, status: 'confirmed' };

    jest.spyOn(service, 'update').mockResolvedValue(result as any);

    expect(await controller.update('1', dto)).toEqual(result);
  });

  it('should delete an order', async () => {
    const result = { message: 'Order deleted' };
    jest.spyOn(service, 'remove').mockResolvedValue(result as any);

    expect(await controller.remove('1')).toEqual(result);
  });
});
