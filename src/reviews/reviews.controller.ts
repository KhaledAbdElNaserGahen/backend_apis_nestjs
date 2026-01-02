import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    const review = await this.reviewsService.create(createReviewDto, req.user.id);
    return {
      success: true,
      data: { review },
      message: 'Review submitted successfully',
    };
  }

  @Get()
  async findByTarget(@Query('targetType') targetType: string, @Query('targetId') targetId: string) {
    const reviews = await this.reviewsService.findByTarget(targetType, targetId);
    const rating = await this.reviewsService.getAverageRating(targetType, targetId);
    return {
      success: true,
      data: {
        reviews,
        averageRating: rating.average,
        totalReviews: rating.count,
      },
    };
  }

  @Get('my-reviews')
  @UseGuards(JwtAuthGuard)
  async getMyReviews(@Request() req) {
    const reviews = await this.reviewsService.getUserReviews(req.user.id);
    return {
      success: true,
      data: { reviews },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const review = await this.reviewsService.findOne(id);
    return {
      success: true,
      data: { review },
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Request() req, @Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewsService.update(id, updateReviewDto, req.user.id);
    return {
      success: true,
      data: { review },
      message: 'Review updated successfully',
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() req, @Param('id') id: string) {
    await this.reviewsService.remove(id, req.user.id);
    return {
      success: true,
      message: 'Review deleted successfully',
    };
  }

  @Post(':id/respond')
  @UseGuards(JwtAuthGuard)
  async respondToReview(@Request() req, @Param('id') id: string, @Body('response') response: string) {
    const review = await this.reviewsService.respondToReview(id, response, req.user.id);
    return {
      success: true,
      data: { review },
      message: 'Response added successfully',
    };
  }
}
