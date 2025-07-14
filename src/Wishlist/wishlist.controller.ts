import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() dto: CreateWishlistDto) {
    return this.wishlistService.create(dto);
  }

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.wishlistService.findByUser(+userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(+id);
  }
}
