import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('family_members')
export class FamilyMember {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['parent', 'spouse', 'child', 'sibling', 'other'],
  })
  relationship: string;

  @Column({ nullable: true })
  national_id: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  gender: string;

  @Column({ type: 'text', nullable: true })
  medical_info: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
