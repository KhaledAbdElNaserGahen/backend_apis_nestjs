"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("./entities/review.entity");
const mongodb_1 = require("mongodb");
let ReviewsService = class ReviewsService {
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }
    async create(createReviewDto, userId) {
        if (createReviewDto.rating < 1 || createReviewDto.rating > 5) {
            throw new common_1.BadRequestException('Rating must be between 1 and 5');
        }
        const existingReview = await this.reviewsRepository.findOne({
            where: {
                userId,
                targetType: createReviewDto.targetType,
                targetId: createReviewDto.targetId,
            },
        });
        if (existingReview) {
            throw new common_1.BadRequestException('You have already reviewed this');
        }
        const review = this.reviewsRepository.create({
            id: new mongodb_1.ObjectId().toString(),
            userId,
            targetType: createReviewDto.targetType,
            targetId: createReviewDto.targetId,
            rating: createReviewDto.rating,
            comment: createReviewDto.comment,
            isVisible: true,
        });
        return await this.reviewsRepository.save(review);
    }
    async findByTarget(targetType, targetId) {
        return await this.reviewsRepository.find({
            where: {
                targetType,
                targetId,
                isVisible: true,
            },
            order: { created_at: 'DESC' },
        });
    }
    async getAverageRating(targetType, targetId) {
        const reviews = await this.reviewsRepository.find({
            where: {
                targetType,
                targetId,
                isVisible: true,
            },
        });
        if (reviews.length === 0) {
            return { average: 0, count: 0 };
        }
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        const average = sum / reviews.length;
        return {
            average: Math.round(average * 10) / 10,
            count: reviews.length,
        };
    }
    async findOne(id) {
        const review = await this.reviewsRepository.findOne({
            where: { id },
        });
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        return review;
    }
    async update(id, updateReviewDto, userId) {
        const review = await this.findOne(id);
        if (review.userId !== userId) {
            throw new common_1.BadRequestException('Not authorized to update this review');
        }
        if (updateReviewDto.rating !== undefined) {
            if (updateReviewDto.rating < 1 || updateReviewDto.rating > 5) {
                throw new common_1.BadRequestException('Rating must be between 1 and 5');
            }
            review.rating = updateReviewDto.rating;
        }
        if (updateReviewDto.comment !== undefined) {
            review.comment = updateReviewDto.comment;
        }
        return await this.reviewsRepository.save(review);
    }
    async remove(id, userId) {
        const review = await this.findOne(id);
        if (review.userId !== userId) {
            throw new common_1.BadRequestException('Not authorized to delete this review');
        }
        await this.reviewsRepository.remove(review);
    }
    async respondToReview(id, response, doctorId) {
        const review = await this.findOne(id);
        if (review.targetType !== 'doctor' || review.targetId !== doctorId) {
            throw new common_1.BadRequestException('Not authorized to respond to this review');
        }
        review.doctorResponse = response;
        return await this.reviewsRepository.save(review);
    }
    async getUserReviews(userId) {
        return await this.reviewsRepository.find({
            where: { userId },
            order: { created_at: 'DESC' },
        });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map