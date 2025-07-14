import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Users/user.entity";
import { Cart } from "./cart.entity";
import { Repository } from "typeorm";
import { CreateCartDto } from "./dto/create-cart.dto";
import { CartItem } from "./cart-item.entity";
import { Product } from "src/Product/product.entity";

// cart.service.ts
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private itemRepo: Repository<CartItem>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {}

    async createCart(dto: CreateCartDto): Promise<Cart> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });

    if (!user) {
       throw new Error(`User with ID ${dto.userId} not found`);
    }
    
    const cart = this.cartRepo.create({ user });
    await this.cartRepo.save(cart);

    const items = await Promise.all(
        (dto.items as CreateCartDto['items']).map(async (item) => {
        const product = await this.productRepo.findOneBy({ id: item.productId });
        return this.itemRepo.create({
            cart,
            product,
            quantity: item.quantity,
            price: item.price,
        });
        }),
    );

    await this.itemRepo.save(items);
    cart.items = items;
    return cart;
    }

  async getCartByUser(userId: number) {
    return this.cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
  }
}
