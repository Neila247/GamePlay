import type { GameRules } from "./games/dutch-blitz.ts";

/**
 * Throws at build time if a game record is missing required fields or has
 * obviously wrong values. TypeScript type-checks structure; this catches
 * semantic invariants the type can't express (e.g. empty strings, bad counts).
 */
export function validateGameRules(game: GameRules): void {
  const err = (msg: string) => {
    throw new Error(`[validate] ${game.id ?? "unknown"}: ${msg}`);
  };

  if (!game.id) err("id is required");
  if (!game.name) err("name is required");
  if (game.source !== "hand-authored" && game.source !== "llm-generated")
    err(`source must be hand-authored or llm-generated, got "${game.source}"`);
  if (game.players.min < 1) err("players.min must be >= 1");
  if (game.players.max < game.players.min)
    err("players.max must be >= players.min");
  if (!game.objective) err("objective is required");
  if (game.setup.length === 0) err("setup must have at least one step");
  if (!game.winCondition) err("winCondition is required");

  if (game.playModel === "real-time" && !game.playLoop)
    err("real-time games must define playLoop");
  if (game.playModel === "turn-based" && !game.turnStructure)
    err("turn-based games must define turnStructure");

  for (const step of game.setup) {
    if (!step.id) err("each setup step must have an id");
    if (!step.instruction) err(`setup step "${step.id}" has no instruction`);
  }

  if (game.piles) {
    for (const pile of game.piles) {
      if (!pile.name) err("each pile must have a name");
      if (!pile.purpose) err(`pile "${pile.name}" has no purpose`);
    }
  }
}
