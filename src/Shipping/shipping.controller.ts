import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { UpdateShippingDto } from "./dto/update-shipping.dto";
import { CreateShippingDto } from "./dto/create-shipping.dto";
import { ShippingService } from "./shipping.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('shipping')
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shipping record' })
  @ApiResponse({ status: 201, description: 'Shipping created successfully' })
  create(@Body() dto: CreateShippingDto) {
    return this.shippingService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shipping records' })
  findAll() {
    return this.shippingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shipping record by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shippingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a shipping record' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateShippingDto) {
    return this.shippingService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shipping record' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shippingService.remove(id);
  }
}
