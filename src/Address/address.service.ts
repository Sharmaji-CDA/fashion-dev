import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from 'src/Users/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateAddressDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });

    if (dto.isDefault) {
      await this.addressRepo.update({ user: {id: dto.userId} }, { is_default: false });
    }
    
    const address = this.addressRepo.create({ ...dto, user: {id: dto.userId} });
    return this.addressRepo.save(address);
  }

  findByUser(userId: number) {
    return this.addressRepo.find({
      where: { user: { id: userId } },
      order: { is_default: 'DESC' }
    });
  }

  async setDefault(addressId: number, userId: number) {
    await this.addressRepo.update({ user: { id: userId } }, { is_default: false });
    return this.addressRepo.update({ id: addressId }, { is_default: true });
  }

  findAll() {
    return this.addressRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.addressRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, dto: UpdateAddressDto) {
    await this.addressRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.addressRepo.delete(id);
    return { message: 'Address deleted successfully' };
  }
}
