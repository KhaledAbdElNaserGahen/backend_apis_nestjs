import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('notifications')
export class Notification {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  title_ar: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text', nullable: true })
  message_ar: string;

  @Column({
    type: 'enum',
    enum: ['appointment', 'message', 'emergency', 'system', 'prescription'],
    default: 'system',
  })
  type: string;

  @Column({ default: false })
  is_read: boolean;

  @Column({ type: 'json', nullable: true })
  data: any;

  @Column({ type: 'timestamp', nullable: true })
  read_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
