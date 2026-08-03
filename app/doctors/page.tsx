import type { Metadata } from "next";
import DoctorCard from "@/components/DoctorCard";
import { doctors } from "@/lib/data/doctors";

export const metadata: Metadata = {
  title: "Doctors",
  description: "Meet the physicians and specialists at City Care Clinic.",
};

export default function DoctorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--clinic-ink)]">
        Our doctors
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--clinic-muted)]">
        Browse our care team by specialty and book an appointment with the
        clinician who fits your needs.
      </p>

      {doctors.length === 0 ? (
        <p className="mt-10 text-sm text-[var(--clinic-muted)]">
          No doctors available at the moment.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}
