/** OpenAPI 3 spec for the clinic chatbot REST APIs that actually exist. */

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "City Care Clinic Chatbot API",
    version: "0.1.0",
    description:
      "REST APIs for the clinic AI assistant (n8n/Groq via webhook) and Resend email summaries.",
  },
  servers: [{ url: "/", description: "This application" }],
  paths: {
    "/api/chat": {
      post: {
        summary: "Send a chat message to the clinic assistant",
        description:
          "Forwards the patient message to the existing n8n webhook (Groq-backed) and returns the assistant reply.",
        operationId: "postChat",
        tags: ["Chat"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ChatRequest" },
              example: {
                message: "What are your clinic hours?",
                sessionId: "11111111-2222-3333-4444-555555555555",
                email: "patient@example.com",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Assistant reply",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ChatSuccess" },
              },
            },
          },
          "400": {
            description: "Message is missing or invalid",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Chat service not configured, or unexpected server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "502": {
            description: "n8n webhook failed or returned an unexpected shape",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/summary": {
      post: {
        summary: "Send a conversation summary or appointment confirmation email",
        description:
          "Uses Resend to email a chat summary or appointment confirmation. API keys stay on the server.",
        operationId: "postSummary",
        tags: ["Email"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SummaryRequest" },
              examples: {
                summary: {
                  summary: "Conversation summary",
                  value: {
                    email: "patient@example.com",
                    type: "summary",
                    messages: [
                      { role: "user", content: "I need a checkup." },
                      {
                        role: "assistant",
                        content: "I can help you book a general checkup.",
                      },
                    ],
                  },
                },
                confirmation: {
                  summary: "Appointment confirmation",
                  value: {
                    email: "patient@example.com",
                    type: "confirmation",
                    appointment: {
                      patientName: "Ayesha Khan",
                      doctorName: "Dr. Sara Ahmed",
                      date: "2026-08-20",
                      time: "10:00 AM",
                      reason: "General checkup",
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Email sent",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SummarySuccess" },
              },
            },
          },
          "400": {
            description: "Missing/invalid email, messages, or appointment details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Resend is not configured, or unexpected server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "502": {
            description: "Resend failed to send the email",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ChatRequest: {
        type: "object",
        required: ["message"],
        properties: {
          message: {
            type: "string",
            description: "Patient message to send to the assistant",
          },
          sessionId: {
            type: "string",
            description: "Optional stable chat session id",
          },
          email: {
            type: "string",
            format: "email",
            description: "Optional patient email forwarded to n8n",
          },
        },
      },
      ChatSuccess: {
        type: "object",
        required: ["reply"],
        properties: {
          reply: { type: "string", description: "Assistant reply text" },
        },
      },
      SummaryRequest: {
        type: "object",
        required: ["email"],
        properties: {
          email: {
            type: "string",
            format: "email",
            description: "Recipient email address",
          },
          type: {
            type: "string",
            enum: ["summary", "confirmation"],
            description: "Email type. Defaults to summary.",
          },
          messages: {
            type: "array",
            description: "Required when type is summary",
            items: { $ref: "#/components/schemas/ChatMessage" },
          },
          appointment: {
            $ref: "#/components/schemas/AppointmentDetails",
            description: "Required when type is confirmation",
          },
        },
      },
      ChatMessage: {
        type: "object",
        required: ["role", "content"],
        properties: {
          role: { type: "string", enum: ["user", "assistant"] },
          content: { type: "string" },
        },
      },
      AppointmentDetails: {
        type: "object",
        properties: {
          patientName: { type: "string" },
          doctorName: { type: "string" },
          date: { type: "string" },
          time: { type: "string" },
          reason: { type: "string" },
        },
      },
      SummarySuccess: {
        type: "object",
        required: ["ok", "message"],
        properties: {
          ok: { type: "boolean", example: true },
          message: { type: "string" },
        },
      },
      ErrorResponse: {
        type: "object",
        required: ["error"],
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
} as const;
