import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a review' })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by ID' })
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update review by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete review by ID' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
