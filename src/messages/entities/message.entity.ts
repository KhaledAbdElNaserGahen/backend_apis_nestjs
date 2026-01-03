import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('messages')
export class Message {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column({ name: 'sender_id' })
  senderId: string;

  @Column({ name: 'receiver_id' })
  receiverId: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text', nullable: true })
  data: string;

  @Column({
    type: 'enum',
    enum: ['text', 'image', 'video', 'audio'],
    default: 'text',
  })
  message_type: string;

  @Column({ nullable: true })
  media_path: string;

  @Column({ default: false })
  is_read: boolean;

  @Column({ type: 'timestamp', nullable: true })
  read_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
