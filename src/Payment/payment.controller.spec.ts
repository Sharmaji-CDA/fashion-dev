import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1 }),
            findAll: jest.fn().mockResolvedValue([{ id: 1 }]),
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
            update: jest.fn().mockResolvedValue({ id: 1, amount: 150 }),
            remove: jest.fn().mockResolvedValue({ message: 'Payment record deleted' }),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a payment', async () => {
    const dto: CreatePaymentDto = {
      userId: 1,
      orderId: 1,
      amount: 100,
      payment_method: 'card',
      status: 'pending',
    };
    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1 });
  });

  it('should return all payments', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1 }]);
  });

  it('should return one payment', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({ id: 1 });
  });

  it('should update a payment', async () => {
    const result = await controller.update('1', { amount: 150 });
    expect(result).toEqual({ id: 1, amount: 150 });
  });

  it('should delete a payment', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ message: 'Payment record deleted' });
  });
});
