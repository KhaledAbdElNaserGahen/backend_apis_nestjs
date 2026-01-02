import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Credential {
  title: string;
  institution: string;
  year: number;
}

@Entity('doctor_profiles')
export class DoctorProfile {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column({ name: 'doctor_id', unique: true })
  doctorId: string;

  @Column()
  specialty: string;

  @Column({ name: 'sub_specialties', type: 'json', nullable: true })
  subSpecialties: string[];

  @Column({ name: 'years_of_experience', type: 'int', default: 0 })
  yearsOfExperience: number;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'json', nullable: true })
  credentials: Credential[];

  @Column({ type: 'json', nullable: true })
  languages: string[];

  @Column({ name: 'consultation_fee', type: 'float', nullable: true })
  consultationFee: number;

  @Column({ type: 'json', nullable: true })
  availability: TimeSlot[];

  @Column({ name: 'average_rating', type: 'float', default: 0 })
  averageRating: number;

  @Column({ name: 'total_reviews', type: 'int', default: 0 })
  totalReviews: number;

  @Column({ name: 'total_consultations', type: 'int', default: 0 })
  totalConsultations: number;

  @Column({ name: 'accepts_new_patients', default: true })
  acceptsNewPatients: boolean;

  @Column({ name: 'profile_image', nullable: true })
  profileImage: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
