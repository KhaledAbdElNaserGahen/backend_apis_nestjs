import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('clinics')
export class Clinic {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  specialty: string;

  @Column({ name: 'doctor_name', nullable: true })
  doctorName: string;

  @Column({ name: 'doctor_id', nullable: true })
  doctorId: string;

  @Column({ nullable: true })
  location: string;

  @Column({ name: 'working_hours', nullable: true })
  workingHours: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'available_slots', type: 'int', nullable: true })
  availableSlots: number;

  @Column({ name: 'next_available', nullable: true })
  nextAvailable: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'float', nullable: true, default: 0 })
  rating: number;
}
