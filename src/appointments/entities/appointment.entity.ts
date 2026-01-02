import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('appointments')
export class Appointment {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column()
  patientId: string;

  @Column()
  doctorId: string;

  @Column()
  clinicId: string;

  @Column()
  appointmentDate: string; // YYYY-MM-DD

  @Column()
  appointmentTime: string; // HH:MM

  @Column()
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';

  @Column({ nullable: true })
  reason: string;

  @Column({ default: false })
  isFirstVisit: boolean;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  patientNotes: string;

  @Column({ nullable: true })
  doctorNotes: string;

  @Column({ nullable: true })
  cancelReason: string;

  @Column({ nullable: true })
  duration: number; // in minutes, default 30

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
