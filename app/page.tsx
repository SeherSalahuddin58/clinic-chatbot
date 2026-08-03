import Link from "next/link";
import DoctorCard from "@/components/DoctorCard";
import { doctors } from "@/lib/data/doctors";

const SERVICES = [
  {
    title: "General Checkup",
    description: "Annual physicals, labs, and preventive wellness plans.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: "Dental",
    description: "Cleanings, restorations, and comfortable dental care.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M11.584 2.376a.75.75 0 0 1 .832 0c.933.63 2.168.63 3.101 0a.75.75 0 0 1 .832 0c.933.63 2.168.63 3.101 0a.75.75 0 0 1 1.15.822l-2.25 9a.75.75 0 0 1-.736.566H15.75a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 0-.75-.75h-1.914a.75.75 0 0 1-.736-.566l-2.25-9a.75.75 0 0 1 1.15-.822c.933.63 2.168.63 3.101 0Z" />
      </svg>
    ),
  },
  {
    title: "Pediatrics",
    description: "Newborn visits, immunizations, and childhood care.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path fillRule="evenodd" d="M12 2.25a5.25 5.25 0 0 0-5.25 5.25v.75H6A2.25 2.25 0 0 0 3.75 10.5v7.5A2.25 2.25 0 0 0 6 20.25h12a2.25 2.25 0 0 0 2.25-2.25v-7.5A2.25 2.25 0 0 0 18 8.25h-.75V7.5A5.25 5.25 0 0 0 12 2.25Zm3.75 6V7.5a3.75 3.75 0 1 0-7.5 0v.75h7.5Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: "Cardiology",
    description: "Heart health screening and chronic cardiac care.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>
    ),
  },
];

const featuredDoctors = doctors.slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* Hero — full-bleed visual plane */}
      <section className="relative overflow-hidden border-b border-[var(--clinic-border)]">
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(13,148,136,0.18)_0%,rgba(8,145,178,0.12)_45%,rgba(240,247,248,0.9)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(13,148,136,0.25) 0, transparent 40%), radial-gradient(circle at 80% 20%, rgba(8,145,178,0.2) 0, transparent 35%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--clinic-primary)]">
            City Care Clinic
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--clinic-ink)] sm:text-5xl lg:text-6xl">
            Book your appointment instantly
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--clinic-muted)] sm:text-lg">
            Compassionate primary care, specialty visits, and a virtual assistant
            ready to help you schedule — day or night.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/chat"
              className="rounded-xl bg-[var(--clinic-primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--clinic-primary-hover)]"
            >
              Chat with us
            </Link>
            <Link
              href="/appointments"
              className="rounded-xl border border-[var(--clinic-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--clinic-ink)] transition hover:bg-[var(--clinic-surface)]"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--clinic-ink)] sm:text-3xl">
          About the Clinic
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--clinic-muted)]">
          City Care Clinic has served Karachi families for over twenty years from our
          Defence location. Our multidisciplinary team offers primary care, pediatrics,
          dental, cardiology, dermatology, and orthopedics under one roof — so you can
          get the care you need without the runaround.
        </p>
      </section>

      {/* Services */}
      <section className="border-y border-[var(--clinic-border)] bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--clinic-ink)] sm:text-3xl">
            Services we offer
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--clinic-muted)]">
            Comprehensive care across the specialties our community asks for most.
          </p>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <li key={service.title}>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--clinic-primary)]/10 text-[var(--clinic-primary)]">
                  {service.icon}
                </div>
                <h3 className="text-base font-semibold text-[var(--clinic-ink)]">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--clinic-muted)]">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured doctors */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--clinic-ink)] sm:text-3xl">
              Featured doctors
            </h2>
            <p className="mt-2 text-sm text-[var(--clinic-muted)]">
              Meet a few of the clinicians ready to see you.
            </p>
          </div>
          <Link
            href="/doctors"
            className="text-sm font-medium text-[var(--clinic-primary)] hover:underline"
          >
            View all doctors →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} compact />
          ))}
        </div>
      </section>
    </>
  );
}
