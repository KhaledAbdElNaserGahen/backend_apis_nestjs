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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(@Request() req) {
    const notifications = await this.notificationsService.getNotifications(req.user.id);
    const unreadCount = await this.notificationsService.getUnreadCount(req.user.id);
    return {
      success: true,
      data: {
        notifications,
        unreadCount,
      },
    };
  }

  @Get('unread-count')
  async getUnreadCount(@Request() req) {
    const count = await this.notificationsService.getUnreadCount(req.user.id);
    return {
      success: true,
      data: { count },
    };
  }

  @Put(':id/read')
  async markAsRead(@Request() req, @Param('id') id: string) {
    const notification = await this.notificationsService.markAsRead(+id, req.user.id);
    return {
      success: true,
      data: { notification },
      message: 'Notification marked as read',
    };
  }

  @Put('read-all')
  async markAllAsRead(@Request() req) {
    await this.notificationsService.markAllAsRead(req.user.id);
    return {
      success: true,
      message: 'All notifications marked as read',
    };
  }

  @Delete(':id')
  async deleteNotification(@Request() req, @Param('id') id: string) {
    await this.notificationsService.deleteNotification(+id, req.user.id);
    return {
      success: true,
      message: 'Notification deleted successfully',
    };
  }

  @Delete()
  async deleteAll(@Request() req) {
    await this.notificationsService.deleteAll(req.user.id);
    return {
      success: true,
      message: 'All notifications deleted successfully',
    };
  }
}
