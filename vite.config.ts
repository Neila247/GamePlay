import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Local-dev shim for the teacher Netlify Function.
 *
 * In production the function at netlify/functions/teacher.mts handles
 * POST /api/teacher. During `npm run dev` there is no Netlify runtime, so this
 * middleware mounts the SAME core logic at the SAME path — meaning the client
 * code and the grounding prompt are identical in dev and prod.
 *
 * The Anthropic SDK is imported lazily, only when a question is actually
 * submitted, so the key and the dependency never load until needed.
 */
function teacherDevApi(env: Record<string, string>): Plugin {
  return {
    name: "teacher-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/teacher", async (req, res) => {
        const send = (status: number, body: unknown) => {
          res.statusCode = status;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify(body));
        };

        if (req.method !== "POST") return send(405, { error: "Method not allowed" });

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);

        let body: unknown;
        try {
          body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        } catch {
          return send(400, { error: "Invalid JSON body" });
        }

        const { game, question } = (body ?? {}) as {
          game?: unknown;
          question?: unknown;
        };
        if (!game || typeof question !== "string" || !question.trim()) {
          return send(400, { error: "Request must include game data and a question." });
        }

        try {
          // Make the key from .env available to the core (server-side only).
          if (!process.env.ANTHROPIC_API_KEY && env.ANTHROPIC_API_KEY) {
            process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
          }
          const { askTeacher } = await import("./netlify/lib/teacher-core.ts");
          const answer = await askTeacher({ game: game as never, question });
          send(200, { answer });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          send(500, { error: message });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load .env (all keys, not just VITE_*) so the dev middleware can read the
  // server-side ANTHROPIC_API_KEY. loadEnv does not expose these to the client.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), teacherDevApi(env)],
  };
});
