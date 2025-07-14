import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

describe('AddressController', () => {
  let controller: AddressController;
  let service: AddressService;

  const mockService = {
    create: jest.fn(),
    findByUser: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [{ provide: AddressService, useValue: mockService }],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create when create is called', async () => {
    const dto = { userId: 1, street: 'Street', city: 'City', isDefault: true };
    mockService.create.mockResolvedValue(dto);

    const result = await controller.create(dto as any);
    expect(result).toEqual(dto);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return user addresses', async () => {
    const userId = 1;
    const addresses = [{ id: 1, userId }];
    mockService.findByUser.mockResolvedValue(addresses);

    const result = await controller.findByUser(userId.toString());
    expect(result).toEqual(addresses);
  });
});
