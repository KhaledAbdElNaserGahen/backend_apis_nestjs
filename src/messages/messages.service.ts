import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async sendMessage(sendMessageDto: SendMessageDto, senderId: string | number): Promise<Message> {
    const senderIdStr = typeof senderId === 'number' ? senderId.toString() : senderId;
    const message = this.messagesRepository.create({
      ...sendMessageDto,
      senderId: senderIdStr,
      receiverId: typeof sendMessageDto.receiverId === 'number' ? sendMessageDto.receiverId.toString() : sendMessageDto.receiverId,
      message_type: sendMessageDto.message_type || 'text',
    });

    return await this.messagesRepository.save(message);
  }

  async getConversations(userId: string | number): Promise<any[]> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    // For MongoDB, we need to find messages differently
    const allMessages = await this.messagesRepository.find({
      where: [
        { senderId: userIdStr } as any,
        { receiverId: userIdStr } as any,
      ],
      order: { created_at: 'DESC' } as any,
    });

    // Get unique conversation partners
    const conversationMap = new Map();
    
    allMessages.forEach(msg => {
      const partnerId = msg.senderId === userIdStr ? msg.receiverId : msg.senderId;
      if (!conversationMap.has(partnerId)) {
        conversationMap.set(partnerId, {
          userId: partnerId,
          lastMessage: msg,
          unreadCount: 0,
        });
      }
    });

    // Count unread messages for each conversation
    for (const [partnerId, conv] of conversationMap) {
      const unreadCount = await this.messagesRepository.count({
        where: {
          senderId: partnerId,
          receiverId: userIdStr,
          is_read: false,
        } as any,
      });
      conv.unreadCount = unreadCount;
    }

    return Array.from(conversationMap.values());
  }

  async getMessages(userId: string | number, otherUserId: string | number): Promise<Message[]> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    const otherUserIdStr = typeof otherUserId === 'number' ? otherUserId.toString() : otherUserId;
    
    const messages = await this.messagesRepository.find({
      order: { created_at: 'ASC' } as any,
    });

    return messages.filter(msg => 
      (msg.senderId === userIdStr && msg.receiverId === otherUserIdStr) ||
      (msg.senderId === otherUserIdStr && msg.receiverId === userIdStr)
    );
  }

  async markAsRead(messageId: string | number, userId: string | number): Promise<Message> {
    const messageIdStr = typeof messageId === 'number' ? messageId.toString() : messageId;
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    const message = await this.messagesRepository.findOne({
      where: { id: messageIdStr, receiverId: userIdStr } as any,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    message.is_read = true;
    message.read_at = new Date();

    return await this.messagesRepository.save(message);
  }

  async findOne(messageId: string | number): Promise<Message> {
    const messageIdStr = typeof messageId === 'number' ? messageId.toString() : messageId;
    
    const message = await this.messagesRepository.findOne({
      where: { id: messageIdStr } as any,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  async markAllAsRead(userId: string | number, otherUserId: string | number): Promise<void> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    const otherUserIdStr = typeof otherUserId === 'number' ? otherUserId.toString() : otherUserId;
    
    const messages = await this.messagesRepository.find({
      where: { senderId: otherUserIdStr, receiverId: userIdStr, is_read: false } as any,
    });

    for (const message of messages) {
      message.is_read = true;
      message.read_at = new Date();
      await this.messagesRepository.save(message);
    }
  }

  async deleteMessage(messageId: string | number, userId: string | number): Promise<void> {
    const messageIdStr = typeof messageId === 'number' ? messageId.toString() : messageId;
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    const message = await this.messagesRepository.findOne({
      where: { id: messageIdStr, senderId: userIdStr } as any,
    });

    if (!message) {
      throw new NotFoundException('Message not found or you do not have permission');
    }

    await this.messagesRepository.remove(message);
  }
}
