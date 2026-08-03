import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointments",
  description: "Book an appointment or review visit history at City Care Clinic.",
};

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
