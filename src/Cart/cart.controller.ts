import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { CartService } from "./cart.service";

// cart.controller.ts
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  createCart(@Body() dto: CreateCartDto) {
    return this.cartService.createCart(dto);
  }

  @Get(':userId')
  getCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.getCartByUser(userId);
  }
}