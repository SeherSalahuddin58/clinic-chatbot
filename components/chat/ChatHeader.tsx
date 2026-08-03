/** Header strip for the chat assistant panel */
export default function ChatHeader() {
  return (
    <div className="shrink-0 border-b border-[var(--clinic-border)] bg-white/90 backdrop-blur-sm">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--clinic-primary)] text-white shadow-sm"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M10.5 3.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75V9h5.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H13.5v5.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V12H5.25a.75.75 0 0 1-.75-.75v-1.5A.75.75 0 0 1 5.25 9H10.5V3.75Z" />
          </svg>
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-[var(--clinic-ink)] sm:text-lg">
            Clinic Chat Assistant
          </h1>
          <p className="text-sm text-[var(--clinic-muted)]">
            Book appointments · Ask questions · Request an email summary
          </p>
        </div>
      </div>
    </div>
  );
}
