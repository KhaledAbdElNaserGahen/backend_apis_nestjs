import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('reviews')
export class Review {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column()
  userId: string; // reviewer

  @Column()
  targetType: 'doctor' | 'clinic';

  @Column()
  targetId: string; // doctor_id or clinic_id

  @Column({ type: 'float' })
  rating: number; // 1-5

  @Column({ nullable: true })
  comment: string;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ nullable: true })
  doctorResponse: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
