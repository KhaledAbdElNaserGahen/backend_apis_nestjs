import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
    userId: string | number,
  ): Promise<Notification> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    const notification = this.notificationsRepository.create({
      ...createNotificationDto,
      userId: userIdStr,
    });

    return await this.notificationsRepository.save(notification);
  }

  async getNotifications(userId: string | number): Promise<Notification[]> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    return await this.notificationsRepository.find({
      where: { userId: userIdStr } as any,
      order: { created_at: 'DESC' } as any,
    });
  }

  async getUnreadCount(userId: string | number): Promise<number> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    return await this.notificationsRepository.count({
      where: { userId: userIdStr, is_read: false } as any,
    });
  }

  async markAsRead(notificationId: string | number, userId: string | number): Promise<Notification> {
    const notificationIdStr = typeof notificationId === 'number' ? notificationId.toString() : notificationId;
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationIdStr, userId: userIdStr } as any,
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.is_read = true;
    notification.read_at = new Date();

    return await this.notificationsRepository.save(notification);
  }

  async markAllAsRead(userId: string | number): Promise<void> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    const notifications = await this.notificationsRepository.find({
      where: { userId: userIdStr, is_read: false } as any,
    });

    for (const notification of notifications) {
      notification.is_read = true;
      notification.read_at = new Date();
      await this.notificationsRepository.save(notification);
    }
  }

  async deleteNotification(notificationId: string | number, userId: string | number): Promise<void> {
    const notificationIdStr = typeof notificationId === 'number' ? notificationId.toString() : notificationId;
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationIdStr, userId: userIdStr } as any,
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    await this.notificationsRepository.remove(notification);
  }

  async deleteAll(userId: string | number): Promise<void> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    const notifications = await this.notificationsRepository.find({
      where: { userId: userIdStr } as any,
    });

    await this.notificationsRepository.remove(notifications);
  }
}
