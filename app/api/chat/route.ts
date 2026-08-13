/**
 * POST /api/chat
 * Forwards the patient's message to the n8n webhook and returns { reply }.
 */
import * as Sentry from "@sentry/nextjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, sessionId, email } = body;

    // Basic validation
    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("N8N_WEBHOOK_URL is not set");
      Sentry.captureMessage("N8N_WEBHOOK_URL is not set", {
        level: "error",
        tags: { feature: "chat" },
      });
      return Response.json(
        { error: "Chat service is not configured." },
        { status: 500 }
      );
    }

    // Forward the request to the n8n webhook
    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId, email }),
    });

    if (!n8nResponse.ok) {
      console.error("n8n webhook error:", n8nResponse.status);
      Sentry.captureMessage("n8n webhook error", {
        level: "error",
        tags: { feature: "chat", status: String(n8nResponse.status) },
      });
      return Response.json(
        { error: "Failed to reach the clinic assistant. Please try again." },
        { status: 502 }
      );
    }

    // n8n may return different shapes — normalize to { reply }
    const data = await n8nResponse.json();
    const reply =
      data.reply ??
      data.output ??
      data.text ??
      data.message ??
      (typeof data === "string" ? data : null);

    if (!reply) {
      console.error("Unexpected n8n response:", data);
      Sentry.captureMessage("Unexpected n8n response shape", {
        level: "error",
        tags: { feature: "chat" },
      });
      return Response.json(
        { error: "Received an unexpected response from the assistant." },
        { status: 502 }
      );
    }

    return Response.json({ reply: String(reply) });
  } catch (err) {
    console.error("Chat API error:", err);
    Sentry.captureException(err, { tags: { feature: "chat" } });
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
