// Shared teacher logic. Used by the Netlify Function (production) and the Vite
// dev middleware (local dev) so the grounding prompt lives in exactly one place.
//
// This is the ONLY place the Anthropic API is called. ANTHROPIC_API_KEY is read
// from the server environment and never reaches the client bundle.

import Anthropic from "@anthropic-ai/sdk";
import type { GameRules } from "../../data/games/dutch-blitz.ts";

// Per CLAUDE.md: the teacher uses claude-sonnet-4-6.
const MODEL = "claude-sonnet-4-6";

// Answers are short by design — this is a friend at the table, not an essay.
const MAX_TOKENS = 400;

/**
 * The grounding contract. The whole point of the hybrid model: the teacher
 * reads and explains the supplied rule data, it does not recall the game from
 * its own training. The rule data is embedded below as the authoritative rules.
 */
export function buildSystemPrompt(game: GameRules): string {
  return [
    "You are teaching a player a board game. Answer ONLY using the rule data provided in this prompt. Treat it as the complete, authoritative rules.",
    "If the data does not cover the question, say so plainly and suggest they check the rulebook. Never guess, infer, or invent a ruling.",
    "Keep answers short and warm, like a friend at the table. Quote the relevant rule when it helps.",
    "Do not rely on anything you know about this game from outside the data.",
    "",
    `The game is "${game.name}".`,
    "",
    "Rule data (JSON — this is the complete, authoritative rules):",
    JSON.stringify(stripMeta(game), null, 2),
  ].join("\n");
}

/** Drop fields that are bookkeeping, not rules, to keep the prompt focused. */
function stripMeta(game: GameRules): Omit<GameRules, "id" | "source" | "verified"> {
  const { id: _id, source: _source, verified: _verified, ...rules } = game;
  return rules;
}

export type AskTeacherInput = { game: GameRules; question: string };

export async function askTeacher({ game, question }: AskTeacherInput): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to your environment (see .env.example)."
    );
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: buildSystemPrompt(game),
    messages: [{ role: "user", content: question }],
  });

  const text = message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  return text || "I'm not sure how to answer that from the rules I have.";
}
