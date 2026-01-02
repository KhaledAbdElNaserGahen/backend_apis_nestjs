import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: string): Promise<Review> {
    // Validate rating
    if (createReviewDto.rating < 1 || createReviewDto.rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    // Check if user already reviewed this target
    const existingReview = await this.reviewsRepository.findOne({
      where: {
        userId,
        targetType: createReviewDto.targetType,
        targetId: createReviewDto.targetId,
      } as any,
    });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this');
    }

    const review = this.reviewsRepository.create({
      id: new ObjectId().toString(),
      userId,
      targetType: createReviewDto.targetType,
      targetId: createReviewDto.targetId,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
      isVisible: true,
    });

    return await this.reviewsRepository.save(review);
  }

  async findByTarget(targetType: string, targetId: string): Promise<Review[]> {
    return await this.reviewsRepository.find({
      where: {
        targetType,
        targetId,
        isVisible: true,
      } as any,
      order: { created_at: 'DESC' } as any,
    });
  }

  async getAverageRating(targetType: string, targetId: string): Promise<{ average: number; count: number }> {
    const reviews = await this.reviewsRepository.find({
      where: {
        targetType,
        targetId,
        isVisible: true,
      } as any,
    });

    if (reviews.length === 0) {
      return { average: 0, count: 0 };
    }

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / reviews.length;

    return {
      average: Math.round(average * 10) / 10, // Round to 1 decimal
      count: reviews.length,
    };
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id } as any,
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, userId: string): Promise<Review> {
    const review = await this.findOne(id);

    if (review.userId !== userId) {
      throw new BadRequestException('Not authorized to update this review');
    }

    if (updateReviewDto.rating !== undefined) {
      if (updateReviewDto.rating < 1 || updateReviewDto.rating > 5) {
        throw new BadRequestException('Rating must be between 1 and 5');
      }
      review.rating = updateReviewDto.rating;
    }

    if (updateReviewDto.comment !== undefined) {
      review.comment = updateReviewDto.comment;
    }

    return await this.reviewsRepository.save(review);
  }

  async remove(id: string, userId: string): Promise<void> {
    const review = await this.findOne(id);

    if (review.userId !== userId) {
      throw new BadRequestException('Not authorized to delete this review');
    }

    await this.reviewsRepository.remove(review);
  }

  async respondToReview(id: string, response: string, doctorId: string): Promise<Review> {
    const review = await this.findOne(id);

    // Check if the doctor is the target of the review
    if (review.targetType !== 'doctor' || review.targetId !== doctorId) {
      throw new BadRequestException('Not authorized to respond to this review');
    }

    review.doctorResponse = response;
    return await this.reviewsRepository.save(review);
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    return await this.reviewsRepository.find({
      where: { userId } as any,
      order: { created_at: 'DESC' } as any,
    });
  }
}
