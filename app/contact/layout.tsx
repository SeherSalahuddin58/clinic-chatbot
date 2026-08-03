import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact City Care Clinic — address, phone, email, and message form.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
