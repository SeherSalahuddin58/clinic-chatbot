"use client";

import { FormEvent, RefObject } from "react";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
};

/** Message composer for the chat assistant */
export default function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  inputRef,
}: ChatInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 px-4 py-3 sm:px-6 sm:py-4"
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message…"
        disabled={disabled}
        autoComplete="off"
        className="min-w-0 flex-1 rounded-xl border border-[var(--clinic-border)] bg-[var(--clinic-surface)] px-4 py-3 text-[15px] text-[var(--clinic-ink)] outline-none transition placeholder:text-[var(--clinic-muted)]/70 focus:border-[var(--clinic-primary)] focus:ring-2 focus:ring-[var(--clinic-primary)]/20 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex shrink-0 items-center justify-center rounded-xl bg-[var(--clinic-primary)] px-4 py-3 text-white transition hover:bg-[var(--clinic-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </button>
    </form>
  );
}
