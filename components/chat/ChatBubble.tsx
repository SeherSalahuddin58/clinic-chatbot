type ChatBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

/** Small circular avatar shown next to assistant bubbles */
function AssistantAvatar() {
  return (
    <div
      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--clinic-accent)] text-white"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
          clipRule="evenodd"
        />
        <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
      </svg>
    </div>
  );
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-[var(--clinic-primary)] px-4 py-3 text-white shadow-sm">
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <AssistantAvatar />
      <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[var(--clinic-border)] bg-white px-4 py-3 text-[var(--clinic-ink)] shadow-sm">
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}

export { AssistantAvatar };
