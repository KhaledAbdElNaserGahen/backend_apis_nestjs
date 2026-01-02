import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'national_id', nullable: true, unique: true })
  nationalId: string;

  @Column({ name: 'national_id_image', nullable: true })
  nationalIdImage: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ name: 'hearing_status', nullable: true })
  hearingStatus: string;

  @Column({ name: 'marital_status', nullable: true })
  maritalStatus: string;

  @Column({ name: 'sign_language_level', nullable: true })
  signLanguageLevel: string;

  @Column({ nullable: true })
  governorate: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ nullable: true })
  job: string;

  @Column({ name: 'service_card_image', nullable: true })
  serviceCardImage: string;

  @Column({ name: 'medical_history', type: 'text', nullable: true })
  medicalHistory: string;

  @Column({ type: 'text', nullable: true })
  allergies: string;

  @Column({ name: 'emergency_contact', nullable: true })
  emergencyContact: string;

  @Column({ name: 'emergency_phone', nullable: true })
  emergencyPhone: string;

  @Column({ name: 'blood_type', nullable: true })
  bloodType: string;

  @Column({ default: 'patient' })
  role: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ name: 'last_login', nullable: true })
  lastLogin: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
