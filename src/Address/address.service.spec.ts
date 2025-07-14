import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';

const mockAddressRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('AddressService', () => {
  let service: AddressService;
  let repo: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        { provide: getRepositoryToken(Address), useFactory: mockAddressRepository },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repo = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return an address', async () => {
    const dto = { userId: 1, street: '123', city: 'NY', isDefault: true };
    const mockAddress = { id: 1, ...dto };

    repo.create = jest.fn().mockReturnValue(mockAddress);
    repo.save = jest.fn().mockResolvedValue(mockAddress);

    const result = await service.create(dto as any);
    expect(result).toEqual(mockAddress);
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
  });

  it('should return addresses by user ID', async () => {
    const mockAddresses = [{ id: 1, userId: 1 }];
    repo.find = jest.fn().mockResolvedValue(mockAddresses);

    const result = await service.findByUser(1);
    expect(result).toEqual(mockAddresses);
  });
});
