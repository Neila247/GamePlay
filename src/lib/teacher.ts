// Client-side caller for the teacher endpoint. Posts the rule data + question
// to /api/teacher (a Netlify Function in prod, a Vite middleware in dev) and
// returns the grounded answer. No Anthropic logic or key lives on the client.

import type { GameRules } from "../../data/games/dutch-blitz.ts";

export async function askTeacher(game: GameRules, question: string): Promise<string> {
  const res = await fetch("/api/teacher", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ game, question }),
  });

  const data: { answer?: string; error?: string } = await res
    .json()
    .catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `The teacher couldn't answer (${res.status}).`);
  }
  return data.answer ?? "";
}
