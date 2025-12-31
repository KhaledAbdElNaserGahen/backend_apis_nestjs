import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Use /tmp for Vercel serverless (only writable directory)
const uploadDir = process.env.NODE_ENV === 'production' ? '/tmp/uploads/videos' : './uploads/videos';

// Ensure directory exists
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: uploadDir,
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
        fileFilter: (req, file, callback) => {
          if (file.fieldname === 'video') {
            if (!file.mimetype.startsWith('video/')) {
              return callback(new BadRequestException('Only video files are allowed'), false);
            }
          } else if (file.fieldname === 'thumbnail') {
            if (!file.mimetype.startsWith('image/')) {
              return callback(new BadRequestException('Only image files are allowed'), false);
            }
          }
          callback(null, true);
        },
        limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
      },
    ),
  )
  async uploadVideo(
    @Request() req,
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFiles()
    files: {
      video?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    },
  ) {
    if (!files.video || !files.video[0]) {
      throw new BadRequestException('Video file is required');
    }

    const videoFile = files.video[0];
    const thumbnailFile = files.thumbnail?.[0];

    const video = await this.videosService.create(
      createVideoDto,
      req.user.id,
      videoFile.path,
      thumbnailFile?.path || null,
      videoFile.size,
      videoFile.mimetype,
    );

    return {
      success: true,
      data: video,
      message: 'Video uploaded successfully',
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const videos = await this.videosService.findAll();
    return {
      success: true,
      data: { videos },
    };
  }

  @Get('my-videos')
  @UseGuards(JwtAuthGuard)
  async getMyVideos(@Request() req) {
    const videos = await this.videosService.findByUser(req.user.id);
    return {
      success: true,
      data: { videos },
    };
  }

  @Get('category/:category')
  @UseGuards(JwtAuthGuard)
  async getByCategory(@Param('category') category: string) {
    const videos = await this.videosService.findByCategory(category);
    return {
      success: true,
      data: { videos },
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const video = await this.videosService.findOne(+id);
    return {
      success: true,
      data: { video },
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    const video = await this.videosService.update(+id, updateVideoDto, req.user.id);
    return {
      success: true,
      data: { video },
      message: 'Video updated successfully',
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    await this.videosService.remove(+id, req.user.id);
    return {
      success: true,
      message: 'Video deleted successfully',
    };
  }
}
