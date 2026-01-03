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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const messages_service_1 = require("../messages/messages.service");
let ChatGateway = class ChatGateway {
    constructor(messagesService) {
        this.messagesService = messagesService;
        this.connectedUsers = new Map();
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        for (const [userId, socketId] of this.connectedUsers.entries()) {
            if (socketId === client.id) {
                this.connectedUsers.delete(userId);
                this.server.emit('user-status', { userId, status: 'offline' });
                break;
            }
        }
    }
    handleUserOnline(data, client) {
        this.connectedUsers.set(data.userId, client.id);
        console.log(`User ${data.userId} is online`);
        this.server.emit('user-status', { userId: data.userId, status: 'online' });
        return { success: true, message: 'User status updated' };
    }
    async handleSendMessage(data, client) {
        try {
            const result = await this.messagesService.sendMessage(data, data.senderId);
            const receiverSocketId = this.connectedUsers.get(data.receiverId);
            if (receiverSocketId) {
                this.server.to(receiverSocketId).emit('receive-message', {
                    message: result,
                });
            }
            return {
                success: true,
                data: result,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
    handleTyping(data) {
        const receiverSocketId = this.connectedUsers.get(data.receiverId);
        if (receiverSocketId) {
            this.server.to(receiverSocketId).emit('user-typing', {
                userId: data.senderId,
                isTyping: data.isTyping,
            });
        }
    }
    async handleMarkRead(data) {
        try {
            await this.messagesService.markAsRead(+data.messageId, data.userId);
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
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    handleJoinRoom(data, client) {
        client.join(data.roomId);
        console.log(`Client ${client.id} joined room ${data.roomId}`);
        return { success: true, message: `Joined room ${data.roomId}` };
    }
    handleLeaveRoom(data, client) {
        client.leave(data.roomId);
        console.log(`Client ${client.id} left room ${data.roomId}`);
        return { success: true, message: `Left room ${data.roomId}` };
    }
    isUserOnline(userId) {
        return this.connectedUsers.has(userId);
    }
    getOnlineUsers() {
        return Array.from(this.connectedUsers.keys());
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('user-online'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleUserOnline", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send-message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('mark-read'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMarkRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveRoom", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map