import type { Appointment, AppointmentStatus } from "@/lib/types";

type AppointmentTableProps = {
  appointments: Appointment[];
  loading?: boolean;
  emptyMessage?: string;
};

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  Upcoming: "bg-teal-50 text-teal-800",
  Completed: "bg-slate-100 text-slate-700",
  Cancelled: "bg-red-50 text-red-700",
};

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AppointmentTable({
  appointments,
  loading = false,
  emptyMessage = "No appointments found.",
}: AppointmentTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-[var(--clinic-border)] bg-white px-4 py-10 text-center text-sm text-[var(--clinic-muted)]">
        Loading appointments…
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--clinic-border)] bg-white px-4 py-10 text-center text-sm text-[var(--clinic-muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--clinic-border)] bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-[var(--clinic-border)] bg-[var(--clinic-surface)] text-xs uppercase tracking-wide text-[var(--clinic-muted)]">
          <tr>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Doctor</th>
            <th className="px-4 py-3 font-medium">Patient</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr
              key={apt.id}
              className="border-b border-[var(--clinic-border)] last:border-0"
            >
              <td className="px-4 py-3 text-[var(--clinic-ink)]">
                {formatDate(apt.date)}
                <span className="mt-0.5 block text-xs text-[var(--clinic-muted)]">
                  {apt.time}
                </span>
              </td>
              <td className="px-4 py-3 text-[var(--clinic-muted)]">
                {apt.doctorName}
              </td>
              <td className="px-4 py-3 text-[var(--clinic-muted)]">
                {apt.patientName}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[apt.status]}`}
                >
                  {apt.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
