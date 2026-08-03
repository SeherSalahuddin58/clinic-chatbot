"use client";

import { useMemo, useState } from "react";
import PatientRow from "@/components/PatientRow";
import { patients } from "@/lib/data/patients";

export default function PatientsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--clinic-ink)]">
        Patients
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--clinic-muted)]">
        Search and review patient records. Data shown here is sample data for
        demonstration.
      </p>

      <div className="mt-6 max-w-md">
        <label htmlFor="patient-search" className="sr-only">
          Search patients
        </label>
        <input
          id="patient-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          className="w-full rounded-lg border border-[var(--clinic-border)] bg-white px-3 py-2.5 text-sm text-[var(--clinic-ink)] outline-none transition placeholder:text-[var(--clinic-muted)]/60 focus:border-[var(--clinic-primary)] focus:ring-2 focus:ring-[var(--clinic-primary)]/20"
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--clinic-border)] bg-white">
        {filtered.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-[var(--clinic-muted)]">
            No patients found matching your search.
          </p>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-[var(--clinic-border)] bg-[var(--clinic-surface)] text-xs uppercase tracking-wide text-[var(--clinic-muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  Email
                </th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Phone
                </th>
                <th className="px-4 py-3 font-medium">Age / DOB</th>
                <th className="hidden px-4 py-3 font-medium lg:table-cell">
                  Last visit
                </th>
                <th className="px-4 py-3 font-medium">Assigned doctor</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <PatientRow key={patient.id} patient={patient} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
