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
} from '@nestjs/common';
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
