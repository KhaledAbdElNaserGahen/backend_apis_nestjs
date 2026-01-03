import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, string> = new Map(); // userId -> socketId

  constructor(private messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    
    // Remove user from connected users
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        // Notify others that user is offline
        this.server.emit('user-status', { userId, status: 'offline' });
        break;
      }
    }
  }

  @SubscribeMessage('user-online')
  handleUserOnline(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.connectedUsers.set(data.userId, client.id);
    console.log(`User ${data.userId} is online`);
    
    // Broadcast to all users that this user is online
    this.server.emit('user-status', { userId: data.userId, status: 'online' });
    
    return { success: true, message: 'User status updated' };
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // Save message to database
      const result = await this.messagesService.sendMessage(data, data.senderId);
      
      // Get receiver's socket ID
      const receiverSocketId = this.connectedUsers.get(data.receiverId);
      
      // If receiver is online, send them the message
      if (receiverSocketId) {
        this.server.to(receiverSocketId).emit('receive-message', {
          message: result,
        });
      }

      // Send confirmation to sender
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { senderId: string; receiverId: string; isTyping: boolean },
  ) {
    const receiverSocketId = this.connectedUsers.get(data.receiverId);
    
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('user-typing', {
        userId: data.senderId,
        isTyping: data.isTyping,
      });
    }
  }

  @SubscribeMessage('mark-read')
  async handleMarkRead(
    @MessageBody() data: { messageId: string; userId: string },
  ) {
    try {
      await this.messagesService.markAsRead(+data.messageId, data.userId);
      
      // Notify sender that message was read
      const message = await this.messagesService.findOne(+data.messageId);
      if (message) {
        const senderSocketId = this.connectedUsers.get(message.senderId);
        if (senderSocketId) {
          this.server.to(senderSocketId).emit('message-read', {
            messageId: data.messageId,
          });
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
    console.log(`Client ${client.id} joined room ${data.roomId}`);
    return { success: true, message: `Joined room ${data.roomId}` };
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.roomId);
    console.log(`Client ${client.id} left room ${data.roomId}`);
    return { success: true, message: `Left room ${data.roomId}` };
  }

  // Method to check if user is online
  isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  // Method to get online users
  getOnlineUsers(): string[] {
    return Array.from(this.connectedUsers.keys());
  }
}
