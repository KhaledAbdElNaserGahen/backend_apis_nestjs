import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

@Entity('prescriptions')
export class Prescription {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column({ name: 'patient_id' })
  patientId: string;

  @Column({ name: 'doctor_id' })
  doctorId: string;

  @Column({ name: 'appointment_id', nullable: true })
  appointmentId: string;

  @Column()
  diagnosis: string;

  @Column({ type: 'json' })
  medications: Medication[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'valid_until', nullable: true })
  validUntil: Date;

  @Column({ default: 'active' })
  status: string; // active, expired, cancelled

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
