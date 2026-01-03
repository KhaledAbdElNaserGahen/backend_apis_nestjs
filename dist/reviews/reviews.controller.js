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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const reviews_service_1 = require("./reviews.service");
const create_review_dto_1 = require("./dto/create-review.dto");
const update_review_dto_1 = require("./dto/update-review.dto");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async create(req, createReviewDto) {
        const review = await this.reviewsService.create(createReviewDto, req.user.id);
        return {
            success: true,
            data: { review },
            message: 'Review submitted successfully',
        };
    }
    async findByTarget(targetType, targetId) {
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
    async getMyReviews(req) {
        const reviews = await this.reviewsService.getUserReviews(req.user.id);
        return {
            success: true,
            data: { reviews },
        };
    }
    async findOne(id) {
        const review = await this.reviewsService.findOne(id);
        return {
            success: true,
            data: { review },
        };
    }
    async update(req, id, updateReviewDto) {
        const review = await this.reviewsService.update(id, updateReviewDto, req.user.id);
        return {
            success: true,
            data: { review },
            message: 'Review updated successfully',
        };
    }
    async remove(req, id) {
        await this.reviewsService.remove(id, req.user.id);
        return {
            success: true,
            message: 'Review deleted successfully',
        };
    }
    async respondToReview(req, id, response) {
        const review = await this.reviewsService.respondToReview(id, response, req.user.id);
        return {
            success: true,
            data: { review },
            message: 'Response added successfully',
        };
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('targetType')),
    __param(1, (0, common_1.Query)('targetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findByTarget", null);
__decorate([
    (0, common_1.Get)('my-reviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getMyReviews", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/respond'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('response')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "respondToReview", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map