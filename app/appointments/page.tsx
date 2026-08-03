"use client";

import {
  FormEvent,
  ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import AppointmentTable from "@/components/AppointmentTable";
import { doctors } from "@/lib/data/doctors";
import { seedAppointments } from "@/lib/data/appointments";
import type { Appointment } from "@/lib/types";

const STORAGE_KEY = "clinic-appointments";

type FormState = {
  patientName: string;
  email: string;
  phone: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
};

const EMPTY_FORM: FormState = {
  patientName: "",
  email: "",
  phone: "",
  doctorId: "",
  date: "",
  time: "",
  reason: "",
};

function AppointmentsContent() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [confirmation, setConfirmation] = useState<string | null>(null);

  // Load seed + localStorage bookings; pre-fill doctor from ?doctor=
  useEffect(() => {
    const doctorParam = searchParams.get("doctor") ?? "";
    const doctorExists = doctors.some((d) => d.id === doctorParam);

    setForm((prev) => ({
      ...prev,
      doctorId: doctorExists ? doctorParam : prev.doctorId,
    }));

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved: Appointment[] = raw ? JSON.parse(raw) : [];
      setAppointments([...saved, ...seedAppointments]);
    } catch {
      setAppointments(seedAppointments);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return appointments;
    return appointments.filter(
      (a) =>
        a.patientName.toLowerCase().includes(q) ||
        a.doctorName.toLowerCase().includes(q)
    );
  }, [appointments, query]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const doctor = doctors.find((d) => d.id === form.doctorId);
    if (!doctor) return;

    const newApt: Appointment = {
      id: `apt-${crypto.randomUUID()}`,
      date: form.date,
      time: form.time,
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientName: form.patientName.trim(),
      patientEmail: form.email.trim(),
      patientPhone: form.phone.trim(),
      reason: form.reason.trim(),
      status: "Upcoming",
    };

    // Persist only user-created bookings in localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved: Appointment[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newApt, ...saved]));
    } catch {
      /* ignore storage errors in demo mode */
    }

    setAppointments((prev) => [newApt, ...prev]);
    setConfirmation(
      `Appointment booked with ${doctor.name} on ${form.date} at ${form.time}.`
    );
    setForm((prev) => ({
      ...EMPTY_FORM,
      doctorId: prev.doctorId,
    }));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--clinic-ink)]">
        Appointments
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--clinic-muted)]">
        Request a visit with one of our clinicians. New bookings are saved in this
        browser for demo purposes.
      </p>

      {/* Booking form */}
      <section className="mt-8 rounded-2xl border border-[var(--clinic-border)] bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-[var(--clinic-ink)]">
          Book a new appointment
        </h2>

        {confirmation && (
          <div
            role="status"
            className="mt-4 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900"
          >
            {confirmation}
            <button
              type="button"
              className="ml-3 font-medium underline-offset-2 hover:underline"
              onClick={() => setConfirmation(null)}
            >
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Patient name" htmlFor="patientName">
            <input
              id="patientName"
              required
              value={form.patientName}
              onChange={(e) => updateField("patientName", e.target.value)}
              className={inputClass}
              placeholder="Full name"
            />
          </Field>
          <Field label="Email" htmlFor="email">
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={inputClass}
              placeholder="0300-1234567"
            />
          </Field>
          <Field label="Preferred doctor" htmlFor="doctorId">
            <select
              id="doctorId"
              required
              value={form.doctorId}
              onChange={(e) => updateField("doctorId", e.target.value)}
              className={inputClass}
            >
              <option value="">Select a doctor…</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.specialization}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Preferred date" htmlFor="date">
            <input
              id="date"
              type="date"
              required
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Preferred time" htmlFor="time">
            <input
              id="time"
              type="time"
              required
              value={form.time}
              onChange={(e) => updateField("time", e.target.value)}
              className={inputClass}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Reason for visit" htmlFor="reason">
              <textarea
                id="reason"
                required
                rows={3}
                value={form.reason}
                onChange={(e) => updateField("reason", e.target.value)}
                className={inputClass}
                placeholder="Briefly describe why you'd like to be seen"
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-[var(--clinic-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--clinic-primary-hover)]"
            >
              Submit appointment request
            </button>
          </div>
        </form>
      </section>

      {/* History */}
      <section className="mt-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-lg font-semibold text-[var(--clinic-ink)]">
            Appointment history
          </h2>
          <label className="block w-full sm:max-w-xs">
            <span className="sr-only">Filter appointments</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by patient or doctor…"
              className={inputClass}
            />
          </label>
        </div>
        <div className="mt-4">
          <AppointmentTable
            appointments={filtered}
            loading={loading}
            emptyMessage="No appointments found matching your search."
          />
        </div>
      </section>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[var(--clinic-border)] bg-[var(--clinic-surface)] px-3 py-2.5 text-sm text-[var(--clinic-ink)] outline-none transition placeholder:text-[var(--clinic-muted)]/60 focus:border-[var(--clinic-primary)] focus:ring-2 focus:ring-[var(--clinic-primary)]/20";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-xs font-medium text-[var(--clinic-muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function AppointmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-14 text-sm text-[var(--clinic-muted)]">
          Loading appointments…
        </div>
      }
    >
      <AppointmentsContent />
    </Suspense>
  );
}
