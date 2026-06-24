// Pure state machine for a guided teaching session.
// Driven entirely by GameRules data and playModel — no game-specific logic here.

import type { GameRules } from "../../data/games/dutch-blitz.ts";

// ---------------------------------------------------------------------------
// Slide types
// ---------------------------------------------------------------------------

export type SlideKind =
  | { kind: "pile"; pileIndex: number }
  | { kind: "setup"; stepIndex: number }
  | { kind: "practice-intro" }
  | { kind: "play-step"; stepIndex: number }
  | { kind: "priorities" }
  | { kind: "end-condition" }
  | { kind: "scoring" };

export type Stage = "concept-tour" | "setup" | "coached-practice";

export const STAGE_LABELS: Record<Stage, string> = {
  "concept-tour": "Concept Tour",
  setup: "Setup",
  "coached-practice": "Coached Practice",
};

export function stageOf(slide: SlideKind): Stage {
  if (slide.kind === "pile") return "concept-tour";
  if (slide.kind === "setup") return "setup";
  return "coached-practice";
}

// ---------------------------------------------------------------------------
// Slide builders — branch on playModel, never on game id
// ---------------------------------------------------------------------------

function buildRealTimeSlides(game: GameRules): SlideKind[] {
  const slides: SlideKind[] = [];

  // Stage 1: one slide per pile/zone (the core concept for real-time games)
  if (game.piles) {
    game.piles.forEach((_, i) => slides.push({ kind: "pile", pileIndex: i }));
  }

  // Stage 2: confirm-to-advance setup steps
  game.setup.forEach((_, i) => slides.push({ kind: "setup", stepIndex: i }));

  // Stage 3: coached practice
  slides.push({ kind: "practice-intro" });

  game.playLoop?.steps.forEach((_, i) =>
    slides.push({ kind: "play-step", stepIndex: i })
  );

  if (game.priorities?.length) slides.push({ kind: "priorities" });
  if (game.specialCalls?.length) slides.push({ kind: "end-condition" });
  if (game.scoring?.length) slides.push({ kind: "scoring" });

  return slides;
}

export function buildSlides(game: GameRules): SlideKind[] {
  if (game.playModel === "real-time") return buildRealTimeSlides(game);
  // turn-based flow not yet implemented
  return [];
}

// ---------------------------------------------------------------------------
// State machine
// ---------------------------------------------------------------------------

export type SessionState = {
  game: GameRules;
  slides: SlideKind[];
  index: number;
};

export function initSession(game: GameRules): SessionState {
  return { game, slides: buildSlides(game), index: 0 };
}

export function advance(state: SessionState): SessionState {
  if (state.index >= state.slides.length - 1) return state;
  return { ...state, index: state.index + 1 };
}

export function retreat(state: SessionState): SessionState {
  if (state.index <= 0) return state;
  return { ...state, index: state.index - 1 };
}

export function current(state: SessionState): SlideKind | undefined {
  return state.slides[state.index];
}

export function isLast(state: SessionState): boolean {
  return state.index === state.slides.length - 1;
}

// Progress counted within the current stage only (resets per stage).
export function stageProgress(
  state: SessionState,
  slide: SlideKind
): { current: number; total: number } {
  const stage = stageOf(slide);
  const stageSlides = state.slides.filter((s) => stageOf(s) === stage);
  const passedInStage = state.slides
    .slice(0, state.index + 1)
    .filter((s) => stageOf(s) === stage).length;
  return { current: passedInStage, total: stageSlides.length };
}
