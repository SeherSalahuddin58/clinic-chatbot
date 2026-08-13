import { openApiSpec } from "@/lib/openapi";

/** GET /api/docs/openapi — OpenAPI JSON for the existing clinic APIs. */
export async function GET() {
  return Response.json(openApiSpec, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
