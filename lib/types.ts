/** Shared TypeScript interfaces for clinic mock data */

export type AppointmentStatus = "Upcoming" | "Completed" | "Cancelled";

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  yearsOfExperience: number;
  shortBio: string;
  fullBio: string;
  qualifications: string[];
  availableDays: string[];
  timings: string;
  /** Initials used for avatar placeholder */
  initials: string;
  /** Soft accent color for avatar background */
  avatarColor: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  age: number;
  lastVisitDate: string;
  assignedDoctorId: string;
  notes: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
  status: AppointmentStatus;
}
