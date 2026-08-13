"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatBubble, { AssistantAvatar } from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

/** A single chat message shown in the UI */
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SESSION_KEY = "clinic-chat-session-id";
const EMPTY_STATE =
  "Hi! I can help you book an appointment or answer questions about our clinic. How can I help you today?";

/**
 * Full chat UI: bubbles, typing indicator, email field, session persistence,
 * and error banner. POSTs to /api/chat which forwards to the n8n webhook.
 */
export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingSummary, setIsSendingSummary] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Create or restore a stable sessionId from localStorage
  useEffect(() => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    setSessionId(id);
  }, []);

  // Auto-scroll whenever messages change or typing starts
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading || !sessionId) return;

    setError(null);
    setSuccess(null);
    setInput("");

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          sessionId,
          email: email.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get a response.");
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  async function handleSendSummary() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setSuccess(null);
      setError("Please enter your email to send a summary.");
      return;
    }
    if (messages.length === 0) {
      setSuccess(null);
      setError("Chat with the assistant first, then send a summary.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsSendingSummary(true);

    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          type: "summary",
          messages: messages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send email.");
      }

      setSuccess(data.message || "Summary sent. Check your inbox.");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to send email. Please try again.";
      setError(msg);
    } finally {
      setIsSendingSummary(false);
    }
  }

  return (
    <div className="flex h-[min(70vh,640px)] flex-col overflow-hidden rounded-2xl border border-[var(--clinic-border)] bg-[var(--clinic-bg)] shadow-sm sm:h-[min(75vh,700px)]">
      <ChatHeader />

      {/* Email field — needed for Gmail summary automation */}
      <div className="shrink-0 border-b border-[var(--clinic-border)] bg-white">
        <div className="px-4 py-3 sm:px-6">
          <label
            htmlFor="patient-email"
            className="mb-1 block text-xs font-medium text-[var(--clinic-muted)]"
          >
            Email for appointment confirmations &amp; conversation summaries
          </label>
          <div className="flex gap-2">
            <input
              id="patient-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-lg border border-[var(--clinic-border)] bg-[var(--clinic-surface)] px-3 py-2 text-sm text-[var(--clinic-ink)] outline-none transition placeholder:text-[var(--clinic-muted)]/60 focus:border-[var(--clinic-primary)] focus:ring-2 focus:ring-[var(--clinic-primary)]/20"
            />
            <button
              type="button"
              onClick={handleSendSummary}
              disabled={isSendingSummary || isLoading}
              className="shrink-0 rounded-lg bg-[var(--clinic-primary)] px-3 py-2 text-sm font-medium text-white transition hover:bg-[var(--clinic-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSendingSummary ? "Sending…" : "Send summary"}
            </button>
          </div>
        </div>
      </div>

      {/* Success banner */}
      {success && (
        <div
          role="status"
          className="shrink-0 border-b border-teal-200 bg-teal-50 px-4 py-2.5 text-sm text-teal-900 sm:px-6"
        >
          <div className="flex items-start justify-between gap-3">
            <p>{success}</p>
            <button
              type="button"
              onClick={() => setSuccess(null)}
              className="shrink-0 font-medium underline-offset-2 hover:underline"
              aria-label="Dismiss success message"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div
          role="alert"
          className="shrink-0 border-b border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 sm:px-6"
        >
          <div className="flex items-start justify-between gap-3">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError(null)}
              className="shrink-0 font-medium underline-offset-2 hover:underline"
              aria-label="Dismiss error"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
          {messages.length === 0 && !isLoading && (
            <div className="flex gap-3">
              <AssistantAvatar />
              <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[var(--clinic-border)] bg-white px-4 py-3 text-[var(--clinic-ink)] shadow-sm">
                <p className="text-[15px] leading-relaxed">{EMPTY_STATE}</p>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <ChatBubble key={msg.id} role={msg.role} content={msg.content} />
          ))}

          {isLoading && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t border-[var(--clinic-border)] bg-white">
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSend}
          disabled={isLoading || isSendingSummary}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}
