import type { Doctor } from "@/lib/types";

/**
 * Mock doctor roster for City Care Clinic.
 * Replace this array (or wrap in a fetch) when wiring a real API/database.
 */
export const doctors: Doctor[] = [
  {
    id: "dr-aisha-khan",
    name: "Dr. Aisha Khan",
    specialization: "General Practice",
    yearsOfExperience: 14,
    shortBio:
      "Primary care physician focused on preventive health and chronic disease management for adults and families.",
    fullBio:
      "Dr. Aisha Khan has practiced family medicine for over a decade, helping patients navigate wellness plans, annual physicals, and long-term care. She believes in clear communication and shared decision-making so every patient leaves feeling informed and supported.",
    qualifications: [
      "MBBS, Aga Khan University, Karachi",
      "FCPS — Family Medicine",
      "Member, College of Physicians and Surgeons Pakistan",
    ],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
    timings: "9:00 AM – 5:00 PM",
    initials: "AK",
    avatarColor: "#0d9488",
  },
  {
    id: "dr-hamza-siddiqui",
    name: "Dr. Hamza Siddiqui",
    specialization: "Cardiology",
    yearsOfExperience: 18,
    shortBio:
      "Cardiologist specializing in hypertension, heart rhythm disorders, and preventive cardiac care.",
    fullBio:
      "Dr. Hamza Siddiqui brings nearly two decades of cardiology experience to City Care Clinic. He works closely with primary care to catch cardiovascular risk early and designs treatment plans that fit each patient's lifestyle.",
    qualifications: [
      "MBBS, Dow University of Health Sciences, Karachi",
      "FCPS — Cardiology",
      "Fellowship — Interventional Cardiology",
    ],
    availableDays: ["Monday", "Wednesday", "Thursday"],
    timings: "8:30 AM – 4:30 PM",
    initials: "HS",
    avatarColor: "#0891b2",
  },
  {
    id: "dr-fatima-rizvi",
    name: "Dr. Fatima Rizvi",
    specialization: "Pediatrics",
    yearsOfExperience: 11,
    shortBio:
      "Pediatrician dedicated to newborn care, childhood immunizations, and developmental checkups.",
    fullBio:
      "Dr. Fatima Rizvi partners with parents to support healthy growth from infancy through adolescence. Her calm bedside manner and focus on education make visits easier for children and caregivers alike.",
    qualifications: [
      "MBBS, Liaquat National Hospital & Medical College, Karachi",
      "FCPS — Pediatrics",
      "Member, Pakistan Pediatric Association",
    ],
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    timings: "9:00 AM – 6:00 PM",
    initials: "FR",
    avatarColor: "#14b8a6",
  },
  {
    id: "dr-bilal-ahmed",
    name: "Dr. Bilal Ahmed",
    specialization: "Dental Care",
    yearsOfExperience: 16,
    shortBio:
      "General dentist offering cleanings, restorative work, and gentle care for anxious patients.",
    fullBio:
      "Dr. Bilal Ahmed provides comprehensive dental care with an emphasis on comfort and prevention. From routine cleanings to crowns and cosmetic touch-ups, he keeps smiles healthy for the whole family.",
    qualifications: [
      "BDS, Jinnah Sindh Medical University, Karachi",
      "Member, Pakistan Dental Association",
      "Certified in Restorative Dentistry",
    ],
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    timings: "8:00 AM – 4:00 PM",
    initials: "BA",
    avatarColor: "#0e7490",
  },
  {
    id: "dr-sara-malik",
    name: "Dr. Sara Malik",
    specialization: "Dermatology",
    yearsOfExperience: 9,
    shortBio:
      "Dermatologist treating acne, eczema, skin cancer screening, and cosmetic skin concerns.",
    fullBio:
      "Dr. Sara Malik combines medical and cosmetic dermatology to help patients feel confident in their skin. She prioritizes evidence-based treatments and thorough annual skin checks.",
    qualifications: [
      "MBBS, Ziauddin University, Karachi",
      "FCPS — Dermatology",
      "Member, Pakistan Association of Dermatologists",
    ],
    availableDays: ["Monday", "Wednesday", "Friday"],
    timings: "10:00 AM – 5:00 PM",
    initials: "SM",
    avatarColor: "#0f766e",
  },
  {
    id: "dr-usman-qureshi",
    name: "Dr. Usman Qureshi",
    specialization: "Orthopedics",
    yearsOfExperience: 13,
    shortBio:
      "Orthopedic specialist for sports injuries, joint pain, and non-surgical rehabilitation plans.",
    fullBio:
      "Dr. Usman Qureshi helps active patients recover from injuries and manage chronic joint conditions. He favors conservative care first and coordinates closely with physical therapy when needed.",
    qualifications: [
      "MBBS, King Edward Medical University",
      "FCPS — Orthopedic Surgery",
      "Fellowship — Sports Medicine",
    ],
    availableDays: ["Tuesday", "Thursday", "Friday"],
    timings: "8:00 AM – 5:00 PM",
    initials: "UQ",
    avatarColor: "#155e75",
  },
];

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}
