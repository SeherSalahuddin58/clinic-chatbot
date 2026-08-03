import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoctorById } from "@/lib/data/doctors";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = getDoctorById(id);
  return {
    title: doctor?.name ?? "Doctor",
  };
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { id } = await params;
  const doctor = getDoctorById(id);

  if (!doctor) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/doctors"
        className="text-sm font-medium text-[var(--clinic-primary)] hover:underline"
      >
        ← Back to doctors
      </Link>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full text-2xl font-semibold text-white"
          style={{ backgroundColor: doctor.avatarColor }}
          aria-hidden="true"
        >
          {doctor.initials}
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--clinic-ink)]">
            {doctor.name}
          </h1>
          <p className="mt-1 text-base font-medium text-[var(--clinic-primary)]">
            {doctor.specialization}
          </p>
          <p className="mt-1 text-sm text-[var(--clinic-muted)]">
            {doctor.yearsOfExperience} years of experience
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-[var(--clinic-ink)]">About</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--clinic-muted)]">
          {doctor.fullBio}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-[var(--clinic-ink)]">
          Qualifications
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--clinic-muted)]">
          {doctor.qualifications.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 border-t border-[var(--clinic-border)] pt-8">
        <h2 className="text-lg font-semibold text-[var(--clinic-ink)]">
          Availability
        </h2>
        <p className="mt-2 text-sm text-[var(--clinic-muted)]">
          <span className="font-medium text-[var(--clinic-ink)]">Days: </span>
          {doctor.availableDays.join(", ")}
        </p>
        <p className="mt-1 text-sm text-[var(--clinic-muted)]">
          <span className="font-medium text-[var(--clinic-ink)]">Hours: </span>
          {doctor.timings}
        </p>
        <Link
          href={`/appointments?doctor=${doctor.id}`}
          className="mt-6 inline-flex rounded-xl bg-[var(--clinic-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--clinic-primary-hover)]"
        >
          Book Appointment
        </Link>
      </section>
    </div>
  );
}
