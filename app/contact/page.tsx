"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-lg border border-[var(--clinic-border)] bg-[var(--clinic-surface)] px-3 py-2.5 text-sm text-[var(--clinic-ink)] outline-none transition placeholder:text-[var(--clinic-muted)]/60 focus:border-[var(--clinic-primary)] focus:ring-2 focus:ring-[var(--clinic-primary)]/20";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--clinic-ink)]">
        Contact us
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--clinic-muted)]">
        Reach the front desk, send a message, or find us on the map.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Clinic info + map placeholder */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--clinic-ink)]">
            Clinic information
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--clinic-muted)]">
            <li>
              <span className="font-medium text-[var(--clinic-ink)]">Address</span>
              <br />
              Plot 42-C, 26th Street, Phase V
              <br />
              DHA, Defence, Karachi, Pakistan
            </li>
            <li>
              <span className="font-medium text-[var(--clinic-ink)]">Phone</span>
              <br />
              <a href="tel:+922135812345" className="hover:text-[var(--clinic-primary)]">
                021-3581-2345
              </a>
            </li>
            <li>
              <span className="font-medium text-[var(--clinic-ink)]">Email</span>
              <br />
              <a
                href="mailto:hello@citycareclinic.pk"
                className="hover:text-[var(--clinic-primary)]"
              >
                hello@citycareclinic.pk
              </a>
            </li>
            <li>
              <span className="font-medium text-[var(--clinic-ink)]">Hours</span>
              <br />
              Mon–Fri 8:00 AM – 6:00 PM · Sat 9:00 AM – 2:00 PM · Sun Closed
            </li>
          </ul>

          {/* Map placeholder */}
          <div
            className="mt-6 flex h-56 items-center justify-center rounded-2xl border border-dashed border-[var(--clinic-border)] bg-[var(--clinic-surface)] text-center"
            role="img"
            aria-label="Map placeholder for City Care Clinic location"
          >
            <div>
              <p className="text-sm font-medium text-[var(--clinic-ink)]">
                Map placeholder
              </p>
              <p className="mt-1 text-xs text-[var(--clinic-muted)]">
                DHA Phase V, Defence, Karachi
              </p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--clinic-ink)]">
            Send a message
          </h2>

          {sent && (
            <div
              role="status"
              className="mt-4 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900"
            >
              Thanks! Your message has been recorded. We&apos;ll be in touch soon.
              <button
                type="button"
                className="ml-3 font-medium underline-offset-2 hover:underline"
                onClick={() => setSent(false)}
              >
                Dismiss
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[var(--clinic-muted)]">
                Name
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[var(--clinic-muted)]">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[var(--clinic-muted)]">
                Message
              </span>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputClass}
                placeholder="How can we help?"
              />
            </label>
            <button
              type="submit"
              className="rounded-xl bg-[var(--clinic-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--clinic-primary-hover)]"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
