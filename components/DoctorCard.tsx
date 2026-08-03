import Link from "next/link";
import type { Doctor } from "@/lib/types";

type DoctorCardProps = {
  doctor: Doctor;
  /** Compact cards for home page preview */
  compact?: boolean;
};

export default function DoctorCard({ doctor, compact = false }: DoctorCardProps) {
  return (
    <article className="flex h-full flex-col border-b border-[var(--clinic-border)] pb-6 sm:border sm:border-[var(--clinic-border)] sm:bg-white sm:p-5 sm:pb-5">
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: doctor.avatarColor }}
          aria-hidden="true"
        >
          {doctor.initials}
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={`/doctors/${doctor.id}`}
            className="text-base font-semibold text-[var(--clinic-ink)] hover:text-[var(--clinic-primary)]"
          >
            {doctor.name}
          </Link>
          <p className="mt-0.5 text-sm font-medium text-[var(--clinic-primary)]">
            {doctor.specialization}
          </p>
          <p className="mt-1 text-xs text-[var(--clinic-muted)]">
            {doctor.yearsOfExperience} years of experience
          </p>
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--clinic-muted)]">
        {compact ? doctor.shortBio.slice(0, 110) + "…" : doctor.shortBio}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/doctors/${doctor.id}`}
          className="rounded-lg border border-[var(--clinic-border)] px-3 py-2 text-sm font-medium text-[var(--clinic-ink)] transition hover:bg-[var(--clinic-surface)]"
        >
          View profile
        </Link>
        <Link
          href={`/appointments?doctor=${doctor.id}`}
          className="rounded-lg bg-[var(--clinic-primary)] px-3 py-2 text-sm font-medium text-white transition hover:bg-[var(--clinic-primary-hover)]"
        >
          Book Appointment
        </Link>
      </div>
    </article>
  );
}
