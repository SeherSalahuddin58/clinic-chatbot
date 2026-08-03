import { AssistantAvatar } from "./ChatBubble";

/** Animated three-dot typing indicator for the assistant */
export default function TypingIndicator() {
  return (
    <div className="flex gap-3" aria-live="polite" aria-label="Assistant is typing">
      <AssistantAvatar />
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-[var(--clinic-border)] bg-white px-4 py-3 shadow-sm">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
