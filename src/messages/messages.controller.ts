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
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('conversations')
  async getConversations(@Request() req) {
    const conversations = await this.messagesService.getConversations(req.user.id);
    return {
      success: true,
      data: { conversations },
    };
  }

  @Get(':userId')
  async getMessages(@Request() req, @Param('userId') userId: string) {
    const messages = await this.messagesService.getMessages(req.user.id, +userId);
    return {
      success: true,
      data: { messages },
    };
  }

  @Post('send')
  async sendMessage(@Request() req, @Body() sendMessageDto: SendMessageDto) {
    const message = await this.messagesService.sendMessage(sendMessageDto, req.user.id);
    return {
      success: true,
      data: { message },
      message: 'Message sent successfully',
    };
  }

  @Post('send-with-file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/messages',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4|mp3|pdf|doc|docx)$/)) {
          return callback(new Error('Only image, video, audio, and document files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async sendMessageWithFile(
    @Request() req,
    @Body() sendMessageDto: SendMessageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const messageType = this.getMessageType(file.mimetype);
    const mediaPath = file.path.replace(/\\/g, '/');
    
    const message = await this.messagesService.sendMessage(
      {
        ...sendMessageDto,
        message_type: messageType,
        media_path: mediaPath,
      },
      req.user.id,
    );
    
    return {
      success: true,
      data: { message },
      message: 'Message with file sent successfully',
    };
  }

  private getMessageType(mimetype: string): string {
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype.startsWith('audio/')) return 'audio';
    return 'file';
  }

  @Put(':id/read')
  async markAsRead(@Request() req, @Param('id') id: string) {
    const message = await this.messagesService.markAsRead(+id, req.user.id);
    return {
      success: true,
      data: { message },
    };
  }

  @Put(':userId/read-all')
  async markAllAsRead(@Request() req, @Param('userId') userId: string) {
    await this.messagesService.markAllAsRead(req.user.id, +userId);
    return {
      success: true,
      message: 'All messages marked as read',
    };
  }

  @Delete(':id')
  async deleteMessage(@Request() req, @Param('id') id: string) {
    await this.messagesService.deleteMessage(+id, req.user.id);
    return {
      success: true,
      message: 'Message deleted successfully',
    };
  }
}
