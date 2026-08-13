/**
 * POST /api/summary
 * Sends a conversation summary or appointment confirmation via Resend.
 */
import { Resend } from "resend";
import * as Sentry from "@sentry/nextjs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ChatRole = "user" | "assistant";

type SummaryMessage = {
  role: ChatRole;
  content: string;
};

type AppointmentDetails = {
  patientName?: string;
  doctorName?: string;
  date?: string;
  time?: string;
  reason?: string;
};

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildSummaryEmail(messages: SummaryMessage[]) {
  const lines = messages.map((msg) => {
    const who = msg.role === "user" ? "You" : "Clinic Assistant";
    return `${who}: ${msg.content}`;
  });

  const text = [
    "City Care Clinic — Conversation Summary",
    "",
    ...lines,
    "",
    "This is an automated summary from City Care Clinic.",
  ].join("\n");

  const htmlBlocks = messages
    .map((msg) => {
      const who = msg.role === "user" ? "You" : "Clinic Assistant";
      return `<p><strong>${who}:</strong> ${escapeHtml(msg.content).replaceAll("\n", "<br />")}</p>`;
    })
    .join("");

  const html = `
    <div style="font-family: sans-serif; color: #1a3a42; line-height: 1.5;">
      <h2>City Care Clinic — Conversation Summary</h2>
      ${htmlBlocks}
      <p style="color: #5a7a82; font-size: 13px;">This is an automated summary from City Care Clinic.</p>
    </div>
  `;

  return { text, html };
}

function buildConfirmationEmail(appointment: AppointmentDetails) {
  const rows = [
    appointment.patientName && `Patient: ${appointment.patientName}`,
    appointment.doctorName && `Doctor: ${appointment.doctorName}`,
    appointment.date && `Date: ${appointment.date}`,
    appointment.time && `Time: ${appointment.time}`,
    appointment.reason && `Reason: ${appointment.reason}`,
  ].filter(Boolean) as string[];

  const text = [
    "City Care Clinic — Appointment Confirmation",
    "",
    ...rows,
    "",
    "If you need to reschedule, reply to this email or chat with our assistant.",
  ].join("\n");

  const html = `
    <div style="font-family: sans-serif; color: #1a3a42; line-height: 1.5;">
      <h2>City Care Clinic — Appointment Confirmation</h2>
      ${rows.map((row) => `<p>${escapeHtml(row)}</p>`).join("")}
      <p style="color: #5a7a82; font-size: 13px;">If you need to reschedule, reply to this email or chat with our assistant.</p>
    </div>
  `;

  return { text, html };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const type = body.type === "confirmation" ? "confirmation" : "summary";
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const appointment =
      body.appointment && typeof body.appointment === "object"
        ? (body.appointment as AppointmentDetails)
        : {};

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (type === "summary") {
      const validMessages = (messages as unknown[]).filter(
        (msg): msg is SummaryMessage => {
          if (!msg || typeof msg !== "object") return false;
          const item = msg as Partial<SummaryMessage>;
          return (
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string" &&
            item.content.trim().length > 0
          );
        }
      );

      if (validMessages.length === 0) {
        return Response.json(
          { error: "Chat with the assistant first, then send a summary." },
          { status: 400 }
        );
      }

      const apiKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.FROM_EMAIL;
      if (!apiKey || !fromEmail) {
        console.error("Resend is not configured");
        Sentry.captureMessage("Resend is not configured", {
          level: "error",
          tags: { feature: "resend" },
        });
        return Response.json(
          { error: "Email service is not configured." },
          { status: 500 }
        );
      }

      const { text, html } = buildSummaryEmail(validMessages);
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Your City Care Clinic conversation summary",
        text,
        html,
      });

      if (error) {
        console.error("Resend error:", error.name);
        Sentry.captureMessage("Resend failed to send summary email", {
          level: "error",
          tags: { feature: "resend", type: "summary" },
        });
        return Response.json(
          { error: "Failed to send email. Please try again." },
          { status: 502 }
        );
      }

      return Response.json({
        ok: true,
        message: "Summary sent. Check your inbox.",
      });
    }

    const hasAppointmentDetails = Object.values(appointment).some(
      (value) => typeof value === "string" && value.trim().length > 0
    );
    if (!hasAppointmentDetails) {
      return Response.json(
        { error: "Appointment details are required for a confirmation email." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;
    if (!apiKey || !fromEmail) {
      console.error("Resend is not configured");
      Sentry.captureMessage("Resend is not configured", {
        level: "error",
        tags: { feature: "resend" },
      });
      return Response.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const { text, html } = buildConfirmationEmail(appointment);
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Your City Care Clinic appointment confirmation",
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error.name);
      Sentry.captureMessage("Resend failed to send confirmation email", {
        level: "error",
        tags: { feature: "resend", type: "confirmation" },
      });
      return Response.json(
        { error: "Failed to send email. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({
      ok: true,
      message: "Appointment confirmation sent. Check your inbox.",
    });
  } catch (err) {
    console.error("Summary API error:", err);
    Sentry.captureException(err, { tags: { feature: "resend" } });
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
