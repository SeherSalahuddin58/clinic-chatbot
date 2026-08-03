import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patients",
  description: "Browse patient records at City Care Clinic.",
};

export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
