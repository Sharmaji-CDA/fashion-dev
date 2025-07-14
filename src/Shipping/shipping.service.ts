import { Repository } from "typeorm";
import { CreateShippingDto } from "./dto/create-shipping.dto";
import { UpdateShippingDto } from "./dto/update-shipping.dto";
import { User } from "src/Users/user.entity";
import { Order } from "src/Order/order.entity";
import { Shipping } from "./shipping.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping) private shippingRepo: Repository<Shipping>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Order) private orderRepo: Repository<Order>
  ) {}

  async create(dto: CreateShippingDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    const order = await this.orderRepo.findOne({ where: { id: dto.orderId } });

    const shipping = this.shippingRepo.create({
      ...dto,
      user,
      order,
    }as Partial<Shipping>);

    return this.shippingRepo.save(shipping);
  }

  findAll() {
    return this.shippingRepo.find({ relations: ['user', 'order'] });
  }

  findOne(id: number) {
    return this.shippingRepo.findOne({ where: { id }, relations: ['user', 'order'] });
  }

  async update(id: number, dto: UpdateShippingDto) {
    await this.shippingRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.shippingRepo.delete(id);
    return { message: 'Shipping info deleted' };
  }
}
