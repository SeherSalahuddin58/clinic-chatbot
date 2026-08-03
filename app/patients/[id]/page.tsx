import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppointmentTable from "@/components/AppointmentTable";
import { getAppointmentsForPatient } from "@/lib/data/appointments";
import { getDoctorById } from "@/lib/data/doctors";
import { getPatientById } from "@/lib/data/patients";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const patient = getPatientById(id);
  return { title: patient?.name ?? "Patient" };
}

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PatientDetailPage({ params }: PageProps) {
  const { id } = await params;
  const patient = getPatientById(id);

  if (!patient) notFound();

  const doctor = getDoctorById(patient.assignedDoctorId);
  const visits = getAppointmentsForPatient(patient.name);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/patients"
        className="text-sm font-medium text-[var(--clinic-primary)] hover:underline"
      >
        ← Back to patients
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[var(--clinic-ink)]">
        {patient.name}
      </h1>
      <p className="mt-1 text-sm text-[var(--clinic-muted)]">
        Patient ID · {patient.id}
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <Info label="Email" value={patient.email} />
        <Info label="Phone" value={patient.phone} />
        <Info label="Date of birth" value={formatDate(patient.dateOfBirth)} />
        <Info label="Age" value={`${patient.age} years`} />
        <Info label="Last visit" value={formatDate(patient.lastVisitDate)} />
        <Info
          label="Assigned doctor"
          value={
            doctor ? (
              <Link
                href={`/doctors/${doctor.id}`}
                className="text-[var(--clinic-primary)] hover:underline"
              >
                {doctor.name}
              </Link>
            ) : (
              "—"
            )
          }
        />
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-[var(--clinic-ink)]">Notes</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--clinic-muted)]">
          {patient.notes || "No notes on file."}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-[var(--clinic-ink)]">
          Visit history
        </h2>
        <AppointmentTable
          appointments={visits}
          emptyMessage="No past appointments on file for this patient."
        />
      </section>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="border-b border-[var(--clinic-border)] pb-3">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--clinic-muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm text-[var(--clinic-ink)]">{value}</p>
    </div>
  );
}
