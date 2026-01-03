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
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const videos_service_1 = require("./videos.service");
const create_video_dto_1 = require("./dto/create-video.dto");
const update_video_dto_1 = require("./dto/update-video.dto");
const multer_1 = require("multer");
const path_1 = require("path");
const uploadDir = '/tmp/uploads/videos';
let VideosController = class VideosController {
    constructor(videosService) {
        this.videosService = videosService;
    }
    async uploadVideo(req, createVideoDto, files) {
        if (!files.video || !files.video[0]) {
            throw new common_1.BadRequestException('Video file is required');
        }
        const videoFile = files.video[0];
        const thumbnailFile = files.thumbnail?.[0];
        const video = await this.videosService.create(createVideoDto, req.user.id, videoFile.path, thumbnailFile?.path || null, videoFile.size, videoFile.mimetype);
        return {
            success: true,
            data: video,
            message: 'Video uploaded successfully',
        };
    }
    async findAll() {
        const videos = await this.videosService.findAll();
        return {
            success: true,
            data: { videos },
        };
    }
    async getMyVideos(req) {
        const videos = await this.videosService.findByUser(req.user.id);
        return {
            success: true,
            data: { videos },
        };
    }
    async getByCategory(category) {
        const videos = await this.videosService.findByCategory(category);
        return {
            success: true,
            data: { videos },
        };
    }
    async findOne(id) {
        const video = await this.videosService.findOne(+id);
        return {
            success: true,
            data: { video },
        };
    }
    async update(id, req, updateVideoDto) {
        const video = await this.videosService.update(+id, updateVideoDto, req.user.id);
        return {
            success: true,
            data: { video },
            message: 'Video updated successfully',
        };
    }
    async remove(id, req) {
        await this.videosService.remove(+id, req.user.id);
        return {
            success: true,
            message: 'Video deleted successfully',
        };
    }
};
exports.VideosController = VideosController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadDir = '/tmp/uploads/videos';
                const fs = require('fs');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                callback(null, uploadDir);
            },
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                callback(null, `${file.fieldname}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (file.fieldname === 'video') {
                if (!file.mimetype.startsWith('video/')) {
                    return callback(new common_1.BadRequestException('Only video files are allowed'), false);
                }
            }
            else if (file.fieldname === 'thumbnail') {
                if (!file.mimetype.startsWith('image/')) {
                    return callback(new common_1.BadRequestException('Only image files are allowed'), false);
                }
            }
            callback(null, true);
        },
        limits: { fileSize: 100 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_video_dto_1.CreateVideoDto, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "uploadVideo", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-videos'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getMyVideos", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_video_dto_1.UpdateVideoDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "remove", null);
exports.VideosController = VideosController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [videos_service_1.VideosService])
], VideosController);
//# sourceMappingURL=videos.controller.js.map