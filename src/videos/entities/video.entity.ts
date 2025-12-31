import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('videos')
export class Video {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  video_path: string;

  @Column({ nullable: true })
  thumbnail_path: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: ['sign_language', 'medical', 'educational', 'emergency', 'general'],
    default: 'general',
  })
  category: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ type: 'bigint', nullable: true })
  file_size: number;

  @Column({ nullable: true })
  mime_type: string;

  @Column({
    type: 'enum',
    enum: ['processing', 'active', 'inactive'],
    default: 'processing',
  })
  status: string;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
