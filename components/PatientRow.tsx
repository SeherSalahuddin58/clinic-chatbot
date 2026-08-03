import Link from "next/link";
import type { Patient } from "@/lib/types";
import { getDoctorById } from "@/lib/data/doctors";

type PatientRowProps = {
  patient: Patient;
};

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PatientRow({ patient }: PatientRowProps) {
  const doctor = getDoctorById(patient.assignedDoctorId);

  return (
    <tr className="border-b border-[var(--clinic-border)] transition hover:bg-[var(--clinic-surface)]">
      <td className="px-4 py-3">
        <Link
          href={`/patients/${patient.id}`}
          className="font-medium text-[var(--clinic-ink)] hover:text-[var(--clinic-primary)]"
        >
          {patient.name}
        </Link>
      </td>
      <td className="hidden px-4 py-3 text-sm text-[var(--clinic-muted)] sm:table-cell">
        {patient.email}
      </td>
      <td className="hidden px-4 py-3 text-sm text-[var(--clinic-muted)] md:table-cell">
        {patient.phone}
      </td>
      <td className="px-4 py-3 text-sm text-[var(--clinic-muted)]">
        {patient.age}
        <span className="hidden text-[var(--clinic-muted)]/70 lg:inline">
          {" "}
          · {formatDate(patient.dateOfBirth)}
        </span>
      </td>
      <td className="hidden px-4 py-3 text-sm text-[var(--clinic-muted)] lg:table-cell">
        {formatDate(patient.lastVisitDate)}
      </td>
      <td className="px-4 py-3 text-sm text-[var(--clinic-muted)]">
        {doctor?.name ?? "—"}
      </td>
    </tr>
  );
}
