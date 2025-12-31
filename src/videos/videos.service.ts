import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  async create(
    createVideoDto: CreateVideoDto,
    userId: string | number,
    videoPath: string,
    thumbnailPath: string,
    fileSize: number,
    mimeType: string,
  ): Promise<Video> {
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

  async findAll(): Promise<Video[]> {
    return await this.videosRepository.find({
      where: { status: 'active' } as any,
      order: { created_at: 'DESC' } as any,
    });
  }

  async findByUser(userId: string | number): Promise<Video[]> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    return await this.videosRepository.find({
      where: { userId: userIdStr } as any,
      order: { created_at: 'DESC' } as any,
    });
  }

  async findByCategory(category: string): Promise<Video[]> {
    return await this.videosRepository.find({
      where: { category, status: 'active' } as any,
      order: { created_at: 'DESC' } as any,
    });
  }

  async findOne(id: string | number): Promise<Video> {
    const idStr = typeof id === 'number' ? id.toString() : id;
    const video = await this.videosRepository.findOne({
      where: { id: idStr } as any,
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    // Increment views
    video.views += 1;
    await this.videosRepository.save(video);

    return video;
  }

  async update(id: string | number, updateVideoDto: UpdateVideoDto, userId: string | number): Promise<Video> {
    const idStr = typeof id === 'number' ? id.toString() : id;
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    const video = await this.videosRepository.findOne({
      where: { id: idStr, userId: userIdStr } as any,
    });

    if (!video) {
      throw new NotFoundException('Video not found or you do not have permission');
    }

    Object.assign(video, updateVideoDto);
    return await this.videosRepository.save(video);
  }

  async remove(id: string | number, userId: string | number): Promise<void> {
    const idStr = typeof id === 'number' ? id.toString() : id;
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    const video = await this.videosRepository.findOne({
      where: { id: idStr, userId: userIdStr } as any,
    });

    if (!video) {
      throw new NotFoundException('Video not found or you do not have permission');
    }

    await this.videosRepository.remove(video);
  }
}
