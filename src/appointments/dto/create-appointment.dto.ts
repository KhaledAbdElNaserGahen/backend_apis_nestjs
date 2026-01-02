export class CreateAppointmentDto {
  doctorId: string;
  clinicId: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  reason?: string;
  isFirstVisit?: boolean;
  patientNotes?: string;
  duration?: number;
}
