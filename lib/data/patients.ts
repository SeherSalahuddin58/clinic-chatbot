import type { Patient } from "@/lib/types";

/**
 * Mock patient records for City Care Clinic.
 * Structured for easy replacement with a database or API later.
 */
export const patients: Patient[] = [
  {
    id: "pt-amna-hassan",
    name: "Amna Hassan",
    email: "amna.hassan@email.com",
    phone: "0300-1234567",
    dateOfBirth: "1988-03-14",
    age: 38,
    lastVisitDate: "2026-07-12",
    assignedDoctorId: "dr-aisha-khan",
    notes:
      "Prefers morning appointments. Managing mild hypertension with lifestyle changes.",
  },
  {
    id: "pt-ali-raza",
    name: "Ali Raza",
    email: "ali.raza@email.com",
    phone: "0321-9876543",
    dateOfBirth: "1995-11-02",
    age: 30,
    lastVisitDate: "2026-06-28",
    assignedDoctorId: "dr-hamza-siddiqui",
    notes: "Family history of coronary artery disease. Annual cardiac screening recommended.",
  },
  {
    id: "pt-zoya-farooq",
    name: "Zoya Farooq",
    email: "zoya.farooq@email.com",
    phone: "0333-4567890",
    dateOfBirth: "2019-08-21",
    age: 6,
    lastVisitDate: "2026-07-30",
    assignedDoctorId: "dr-fatima-rizvi",
    notes: "Up to date on vaccinations. Mild seasonal allergies noted.",
  },
  {
    id: "pt-imran-shaikh",
    name: "Imran Shaikh",
    email: "imran.shaikh@email.com",
    phone: "0345-1122334",
    dateOfBirth: "1972-01-09",
    age: 54,
    lastVisitDate: "2026-05-15",
    assignedDoctorId: "dr-bilal-ahmed",
    notes: "Needs crown replacement on tooth #19. Sensitive to cold.",
  },
  {
    id: "pt-mehwish-iqbal",
    name: "Mehwish Iqbal",
    email: "mehwish.iqbal@email.com",
    phone: "0312-7788990",
    dateOfBirth: "1991-06-30",
    age: 35,
    lastVisitDate: "2026-07-05",
    assignedDoctorId: "dr-sara-malik",
    notes: "Follow-up for eczema flare. Using prescribed topical steroid as directed.",
  },
  {
    id: "pt-hassan-mirza",
    name: "Hassan Mirza",
    email: "hassan.mirza@email.com",
    phone: "0308-5544332",
    dateOfBirth: "1984-12-18",
    age: 41,
    lastVisitDate: "2026-06-02",
    assignedDoctorId: "dr-usman-qureshi",
    notes: "Recovering from left knee sprain. Physical therapy twice weekly.",
  },
  {
    id: "pt-noor-javed",
    name: "Noor Javed",
    email: "noor.javed@email.com",
    phone: "0331-2233445",
    dateOfBirth: "2001-04-25",
    age: 25,
    lastVisitDate: "2026-07-22",
    assignedDoctorId: "dr-aisha-khan",
    notes: "Annual wellness visit completed. Labs within normal range.",
  },
  {
    id: "pt-kamran-abbasi",
    name: "Kamran Abbasi",
    email: "kamran.abbasi@email.com",
    phone: "0342-6677889",
    dateOfBirth: "1965-09-07",
    age: 60,
    lastVisitDate: "2026-04-18",
    assignedDoctorId: "dr-hamza-siddiqui",
    notes: "On statin therapy. Next lipid panel due in October.",
  },
];

export function getPatientById(id: string): Patient | undefined {
  return patients.find((p) => p.id === id);
}
