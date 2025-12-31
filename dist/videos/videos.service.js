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
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_entity_1 = require("./entities/video.entity");
let VideosService = class VideosService {
    constructor(videosRepository) {
        this.videosRepository = videosRepository;
    }
    async create(createVideoDto, userId, videoPath, thumbnailPath, fileSize, mimeType) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        const video = this.videosRepository.create({
            ...createVideoDto,
            userId: userIdStr,
            video_path: videoPath,
            thumbnail_path: thumbnailPath,
            file_size: fileSize,
            mime_type: mimeType,
            status: 'active',
        });
        return await this.videosRepository.save(video);
    }
    async findAll() {
        return await this.videosRepository.find({
            where: { status: 'active' },
            order: { created_at: 'DESC' },
        });
    }
    async findByUser(userId) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        return await this.videosRepository.find({
            where: { userId: userIdStr },
            order: { created_at: 'DESC' },
        });
    }
    async findByCategory(category) {
        return await this.videosRepository.find({
            where: { category, status: 'active' },
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        const idStr = typeof id === 'number' ? id.toString() : id;
        const video = await this.videosRepository.findOne({
            where: { id: idStr },
        });
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        video.views += 1;
        await this.videosRepository.save(video);
        return video;
    }
    async update(id, updateVideoDto, userId) {
        const idStr = typeof id === 'number' ? id.toString() : id;
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        const video = await this.videosRepository.findOne({
            where: { id: idStr, userId: userIdStr },
        });
        if (!video) {
            throw new common_1.NotFoundException('Video not found or you do not have permission');
        }
        Object.assign(video, updateVideoDto);
        return await this.videosRepository.save(video);
    }
    async remove(id, userId) {
        const idStr = typeof id === 'number' ? id.toString() : id;
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        const video = await this.videosRepository.findOne({
            where: { id: idStr, userId: userIdStr },
        });
        if (!video) {
            throw new common_1.NotFoundException('Video not found or you do not have permission');
        }
        await this.videosRepository.remove(video);
    }
};
exports.VideosService = VideosService;
exports.VideosService = VideosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VideosService);
//# sourceMappingURL=videos.service.js.map