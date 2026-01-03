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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
let MessagesService = class MessagesService {
    constructor(messagesRepository) {
        this.messagesRepository = messagesRepository;
    }
    async sendMessage(sendMessageDto, senderId) {
        const senderIdStr = typeof senderId === 'number' ? senderId.toString() : senderId;
        const message = this.messagesRepository.create({
            ...sendMessageDto,
            senderId: senderIdStr,
            receiverId: typeof sendMessageDto.receiverId === 'number' ? sendMessageDto.receiverId.toString() : sendMessageDto.receiverId,
            message_type: sendMessageDto.message_type || 'text',
        });
        return await this.messagesRepository.save(message);
    }
    async getConversations(userId) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        const allMessages = await this.messagesRepository.find({
            where: [
                { senderId: userIdStr },
                { receiverId: userIdStr },
            ],
            order: { created_at: 'DESC' },
        });
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
        for (const [partnerId, conv] of conversationMap) {
            const unreadCount = await this.messagesRepository.count({
                where: {
                    senderId: partnerId,
                    receiverId: userIdStr,
                    is_read: false,
                },
            });
            conv.unreadCount = unreadCount;
        }
        return Array.from(conversationMap.values());
    }
    async getMessages(userId, otherUserId) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        const otherUserIdStr = typeof otherUserId === 'number' ? otherUserId.toString() : otherUserId;
        const messages = await this.messagesRepository.find({
            order: { created_at: 'ASC' },
        });
        return messages.filter(msg => (msg.senderId === userIdStr && msg.receiverId === otherUserIdStr) ||
            (msg.senderId === otherUserIdStr && msg.receiverId === userIdStr));
    }
    async markAsRead(messageId, userId) {
        const messageIdStr = typeof messageId === 'number' ? messageId.toString() : messageId;
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        const message = await this.messagesRepository.findOne({
            where: { id: messageIdStr, receiverId: userIdStr },
        });
        if (!message) {
            throw new common_1.NotFoundException('Message not found');
        }
        message.is_read = true;
        message.read_at = new Date();
        return await this.messagesRepository.save(message);
    }
    async findOne(messageId) {
        const messageIdStr = typeof messageId === 'number' ? messageId.toString() : messageId;
        const message = await this.messagesRepository.findOne({
            where: { id: messageIdStr },
        });
        if (!message) {
            throw new common_1.NotFoundException('Message not found');
        }
        return message;
    }
    async markAllAsRead(userId, otherUserId) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        const otherUserIdStr = typeof otherUserId === 'number' ? otherUserId.toString() : otherUserId;
        const messages = await this.messagesRepository.find({
            where: { senderId: otherUserIdStr, receiverId: userIdStr, is_read: false },
        });
        for (const message of messages) {
            message.is_read = true;
            message.read_at = new Date();
            await this.messagesRepository.save(message);
        }
    }
    async deleteMessage(messageId, userId) {
        const messageIdStr = typeof messageId === 'number' ? messageId.toString() : messageId;
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        const message = await this.messagesRepository.findOne({
            where: { id: messageIdStr, senderId: userIdStr },
        });
        if (!message) {
            throw new common_1.NotFoundException('Message not found or you do not have permission');
        }
        await this.messagesRepository.remove(message);
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessagesService);
//# sourceMappingURL=messages.service.js.map