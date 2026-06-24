// Netlify Function: the teacher Q&A endpoint (production).
// Receives { game, question }, calls the grounded teacher, returns { answer }.
// The Anthropic API key lives only here, server-side — never in the client.
//
// Locally, npm run dev serves the same logic via a Vite middleware (see
// vite.config.ts), so the Netlify CLI is not required for local development.

import { askTeacher } from "../lib/teacher-core.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { game, question } = (body ?? {}) as {
    game?: unknown;
    question?: unknown;
  };

  if (!game || typeof question !== "string" || !question.trim()) {
    return json({ error: "Request must include game data and a question." }, 400);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const answer = await askTeacher({ game: game as any, question });
    return json({ answer });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return json({ error: message }, 500);
  }
};

// Netlify v2 functions: map this handler to /api/teacher.
export const config = { path: "/api/teacher" };
