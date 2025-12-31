import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<number, string>(); // userId -> socketId

  handleConnection(client: Socket) {
    console.log(`Notification client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Notification client disconnected: ${client.id}`);
    for (const [userId, socketId] of this.userSockets.entries()) {
      if (socketId === client.id) {
        this.userSockets.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('joinNotifications')
  handleJoin(
    @MessageBody() data: { userId: number },
    @ConnectedSocket() client: Socket,
  ) {
    this.userSockets.set(data.userId, client.id);
    console.log(`User ${data.userId} joined notifications with socket ${client.id}`);
  }

  // Method to send notification to specific user
  sendNotificationToUser(userId: number, notification: any) {
    const socketId = this.userSockets.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('newNotification', notification);
    }
  }

  // Method to broadcast notification to all connected users
  broadcastNotification(notification: any) {
    this.server.emit('newNotification', notification);
  }
}
