import type { Metadata } from "next";
import ChatInterface from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "Chat Assistant",
  description:
    "Chat with City Care Clinic's virtual assistant to book appointments or get answers.",
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--clinic-ink)] sm:text-3xl">
          Chat Assistant
        </h1>
        <p className="mt-2 text-sm text-[var(--clinic-muted)]">
          Ask about hours, services, or booking. Tip: say{" "}
          <em>&ldquo;Send me a summary of our conversation by email&rdquo;</em>{" "}
          after entering your email above the chat.
        </p>
      </div>
      <ChatInterface />
    </div>
  );
}
