import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('pharmacies')
export class Pharmacy {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  city: string;

  @Column({ name: 'working_hours', nullable: true })
  workingHours: string;

  @Column({ default: true })
  isOpen: boolean;

  @Column({ name: 'owner_id', nullable: true })
  ownerId: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'pending'],
    default: 'active',
  })
  status: string;

  @Column({ type: 'float', nullable: true, default: 0 })
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
