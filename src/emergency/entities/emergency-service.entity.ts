import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('emergency_services')
export class EmergencyService {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  name_ar: string;

  @Column({
    type: 'enum',
    enum: ['ambulance', 'police', 'fire', 'electricity', 'other'],
  })
  service_type: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  emergency_phone: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  description_ar: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: 0 })
  priority: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
