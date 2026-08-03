import type { Appointment } from "@/lib/types";

/**
 * Seed appointment history for the Appointments page.
 * New bookings are merged client-side (localStorage) on top of this list.
 */
export const seedAppointments: Appointment[] = [
  {
    id: "apt-001",
    date: "2026-08-08",
    time: "10:00 AM",
    doctorId: "dr-aisha-khan",
    doctorName: "Dr. Aisha Khan",
    patientName: "Amna Hassan",
    patientEmail: "amna.hassan@email.com",
    patientPhone: "0300-1234567",
    reason: "Annual physical checkup",
    status: "Upcoming",
  },
  {
    id: "apt-002",
    date: "2026-08-12",
    time: "2:30 PM",
    doctorId: "dr-hamza-siddiqui",
    doctorName: "Dr. Hamza Siddiqui",
    patientName: "Ali Raza",
    patientEmail: "ali.raza@email.com",
    patientPhone: "0321-9876543",
    reason: "Blood pressure follow-up",
    status: "Upcoming",
  },
  {
    id: "apt-003",
    date: "2026-07-30",
    time: "11:15 AM",
    doctorId: "dr-fatima-rizvi",
    doctorName: "Dr. Fatima Rizvi",
    patientName: "Zoya Farooq",
    patientEmail: "zoya.farooq@email.com",
    patientPhone: "0333-4567890",
    reason: "Well-child visit",
    status: "Completed",
  },
  {
    id: "apt-004",
    date: "2026-07-12",
    time: "9:00 AM",
    doctorId: "dr-aisha-khan",
    doctorName: "Dr. Aisha Khan",
    patientName: "Amna Hassan",
    patientEmail: "amna.hassan@email.com",
    patientPhone: "0300-1234567",
    reason: "Hypertension review",
    status: "Completed",
  },
  {
    id: "apt-005",
    date: "2026-06-28",
    time: "3:00 PM",
    doctorId: "dr-hamza-siddiqui",
    doctorName: "Dr. Hamza Siddiqui",
    patientName: "Ali Raza",
    patientEmail: "ali.raza@email.com",
    patientPhone: "0321-9876543",
    reason: "Cardiac screening",
    status: "Completed",
  },
  {
    id: "apt-006",
    date: "2026-08-05",
    time: "1:00 PM",
    doctorId: "dr-bilal-ahmed",
    doctorName: "Dr. Bilal Ahmed",
    patientName: "Imran Shaikh",
    patientEmail: "imran.shaikh@email.com",
    patientPhone: "0345-1122334",
    reason: "Crown consultation",
    status: "Cancelled",
  },
  {
    id: "apt-007",
    date: "2026-08-15",
    time: "10:30 AM",
    doctorId: "dr-sara-malik",
    doctorName: "Dr. Sara Malik",
    patientName: "Mehwish Iqbal",
    patientEmail: "mehwish.iqbal@email.com",
    patientPhone: "0312-7788990",
    reason: "Eczema follow-up",
    status: "Upcoming",
  },
  {
    id: "apt-008",
    date: "2026-06-02",
    time: "4:00 PM",
    doctorId: "dr-usman-qureshi",
    doctorName: "Dr. Usman Qureshi",
    patientName: "Hassan Mirza",
    patientEmail: "hassan.mirza@email.com",
    patientPhone: "0308-5544332",
    reason: "Knee sprain evaluation",
    status: "Completed",
  },
];

/** Appointments linked to a specific patient (by name match for mock data). */
export function getAppointmentsForPatient(patientName: string): Appointment[] {
  return seedAppointments.filter(
    (a) => a.patientName.toLowerCase() === patientName.toLowerCase()
  );
}
