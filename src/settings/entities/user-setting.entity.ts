import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('user_settings')
export class UserSetting {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @Column({ type: 'enum', enum: ['ar', 'en'], default: 'ar' })
  language: string;

  @Column({ default: true })
  notifications_enabled: boolean;

  @Column({ default: true })
  sound_enabled: boolean;

  @Column({ default: true })
  vibration_enabled: boolean;

  @Column({ type: 'enum', enum: ['small', 'medium', 'large'], default: 'medium' })
  font_size: string;

  @Column({ type: 'enum', enum: ['light', 'dark'], default: 'light' })
  theme: string;

  @Column({ default: true })
  show_online_status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
