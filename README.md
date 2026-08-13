This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## City Care Clinic Chatbot

### Project overview

City Care Clinic is a small AI-powered clinic website. Patients can browse doctors, view appointments and patients, and chat with a virtual assistant. The assistant uses the existing n8n webhook (Groq). Resend sends conversation summaries or appointment confirmations. Swagger documents the REST APIs. Sentry tracks application errors.

### Existing features

- Homepage, doctors, doctor detail, appointments, patients, patient detail, and contact pages
- Chat Assistant UI with session persistence and an email field
- `POST /api/chat` forwards messages to the existing n8n / Groq webhook

### AI integration

The chatbot is already connected to n8n. Set `N8N_WEBHOOK_URL` in `.env.local`. The Next.js route does not call OpenAI or Groq directly; n8n handles the AI model.

### Resend setup

1. Create a [Resend](https://resend.com) account and API key.
2. Set `RESEND_API_KEY` and `FROM_EMAIL` in `.env.local`.
3. For testing, Resend allows `City Care Clinic <beth.t@example.com>`. For production, verify your domain.
4. In Chat Assistant, enter an email, chat with the assistant, then click **Send summary**.

### Swagger / OpenAPI

- Swagger UI: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- OpenAPI JSON: [http://localhost:3000/api/docs/openapi](http://localhost:3000/api/docs/openapi)

### Sentry setup

1. Create a Sentry project and copy the DSN.
2. Set both `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN` in `.env.local` to that DSN.
3. Restart `npm run dev`. Frontend crashes, `/api/chat` errors, and Resend errors are reported. Request bodies, API keys, and patient emails are not sent to Sentry.

### Environment variables

Copy `.env.example` to `.env.local` and fill in values (never commit real keys):

```
N8N_WEBHOOK_URL=
RESEND_API_KEY=
FROM_EMAIL=
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
```

### How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/chat` | Send a chat message (n8n / Groq) |
| `POST` | `/api/summary` | Send a conversation summary or appointment confirmation (Resend) |
| `GET` | `/api/docs` | Swagger UI |
| `GET` | `/api/docs/openapi` | OpenAPI JSON |

### Testing steps

1. Open `/`, `/doctors`, `/patients`, `/appointments`, `/contact`, and `/chat` — existing pages should look the same.
2. Send a chat message — the existing n8n assistant should still reply.
3. Enter an email, chat, then click **Send summary** — you should receive an email, or a clear configuration error if Resend keys are missing.
4. Open [http://localhost:3000/api/docs](http://localhost:3000/api/docs) and [http://localhost:3000/api/docs/openapi](http://localhost:3000/api/docs/openapi).
5. Confirm Sentry receives errors after setting the DSN (for example, a `/api/chat` failure or a missing Resend key).

