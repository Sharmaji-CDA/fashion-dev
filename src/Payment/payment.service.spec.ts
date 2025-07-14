import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { User } from 'src/Users/user.entity';
import { Order } from 'src/Order/order.entity';
import { Repository } from 'typeorm';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepo: Repository<Payment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getRepositoryToken(Payment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepo = module.get<Repository<Payment>>(getRepositoryToken(Payment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all payments', async () => {
    const result = [{ id: 1, amount: 100 }];
    jest.spyOn(paymentRepo, 'find').mockResolvedValue(result as any);

    const payments = await service.findAll();
    expect(payments).toEqual(result);
  });

  it('should remove a payment', async () => {
    jest.spyOn(paymentRepo, 'delete').mockResolvedValue({} as any);
    const res = await service.remove(1);
    expect(res).toEqual({ message: 'Payment record deleted' });
  });
});
