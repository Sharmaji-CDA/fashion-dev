import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressservice: AddressService) {}

  @Post()
  create(@Body() dto: CreateAddressDto) {
    return this.addressservice.create(dto);
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.addressservice.findByUser(userId);
  }

  @Patch(':id/set-default/:userId')
  setDefault(@Param('id') id: number, @Param('userId') userId: number) {
    return this.addressservice.setDefault(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.addressservice.remove(id);
  }
}
