import Link from "next/link";

const HOURS = [
  { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--clinic-border)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-[var(--clinic-ink)]">
            City Care Clinic
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--clinic-muted)]">
            Compassionate care for every stage of life. Book online or chat with
            our virtual assistant anytime.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--clinic-ink)]">
            Contact
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-[var(--clinic-muted)]">
            <li>Plot 42-C, 26th Street, Phase V</li>
            <li>DHA, Defence, Karachi, Pakistan</li>
            <li>
              <a
                href="tel:+922135812345"
                className="hover:text-[var(--clinic-primary)]"
              >
                021-3581-2345
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@citycareclinic.pk"
                className="hover:text-[var(--clinic-primary)]"
              >
                hello@citycareclinic.pk
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--clinic-ink)]">
            Hours
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-[var(--clinic-muted)]">
            {HOURS.map((row) => (
              <li key={row.day} className="flex justify-between gap-4">
                <span>{row.day}</span>
                <span className="text-[var(--clinic-ink)]">{row.hours}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <Link
              href="/contact"
              className="text-sm font-medium text-[var(--clinic-primary)] hover:underline"
            >
              Get directions →
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--clinic-border)] py-4 text-center text-xs text-[var(--clinic-muted)]">
        © {new Date().getFullYear()} City Care Clinic. All rights reserved.
      </div>
    </footer>
  );
}
