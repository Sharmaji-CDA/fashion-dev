import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all orders', async () => {
    const result = [{ id: 1 }];
    jest.spyOn(orderRepository, 'find').mockResolvedValue(result as any);

    expect(await service.findAll()).toEqual(result);
  });

  it('should return one order', async () => {
    const result = { id: 1 };
    jest.spyOn(orderRepository, 'findOne').mockResolvedValue(result as any);

    expect(await service.findOne(1)).toEqual(result);
  });

  it('should delete an order', async () => {
    const result = { affected: 1 };
    jest.spyOn(orderRepository, 'delete').mockResolvedValue(result as any);

    expect(await service.remove(1)).toEqual({ message: 'Order deleted' });
  });
});
