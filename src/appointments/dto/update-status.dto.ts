export class UpdateAppointmentStatusDto {
  status: 'confirmed' | 'completed' | 'cancelled';
  doctorNotes?: string;
  cancelReason?: string;
}
