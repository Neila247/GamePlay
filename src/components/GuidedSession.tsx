import { useState, useRef, useLayoutEffect } from "react";
import type { GameRules, PileDef, SetupStep } from "../../data/games/dutch-blitz.ts";
import { CardSequence } from "./diagrams/CardSequence.tsx";
import { overviewFor } from "./diagrams/registry.tsx";
import {
  initSession, advance, retreat, current, isLast, stageOf, stageProgress,
  STAGE_LABELS,
  type SlideKind,
} from "../lib/session.ts";
import { AskTeacher, TEACHER_ENABLED } from "./AskTeacher.tsx";
import { Spine } from "./Spine.tsx";

type Props = { game: GameRules; onExit: () => void };

export function GuidedSession({ game, onExit }: Props) {
  const [state, setState] = useState(() => initSession(game));
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    // rAF ensures the new slide's content has laid out before resetting scroll.
    // useLayoutEffect fires before paint; rAF fires after layout, before the
    // next paint — the combination is reliable on mobile Safari.
    const id = requestAnimationFrame(() => { el.scrollTop = 0; });
    return () => cancelAnimationFrame(id);
  }, [state.index]);

  const slide = current(state);

  if (!slide) {
    return (
      <div className="min-h-svh bg-bg flex items-center justify-center px-4">
        <p className="text-ink-soft text-sm">No guided session available for this game yet.</p>
      </div>
    );
  }

  const stage = stageOf(slide);
  const progress = stageProgress(state, slide);
  const last = isLast(state);
  const canGoBack = state.index > 0;
  const prevStage = state.index > 0 ? stageOf(state.slides[state.index - 1]) : null;
  const stageChanged = prevStage !== null && prevStage !== stage;

  function handleNext() {
    if (last) {
      onExit();
    } else {
      setState(advance(state));
    }
  }

  function handleBack() {
    setState(retreat(state));
  }

  return (
    <>
      <div className="h-svh bg-bg flex flex-col max-w-app mx-auto">
        {/* Header */}
        <header className="px-4 pt-6 pb-3 flex items-center justify-between shrink-0">
          <button
            onClick={onExit}
            className="text-sm text-ink-soft active:text-ink transition-colors"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            ← Exit
          </button>
          <span className="text-sm font-medium text-ink">
            {STAGE_LABELS[stage]}
          </span>
          <span className="text-xs text-ink-soft tabular-nums">
            {progress.current}/{progress.total}
          </span>
        </header>

        {/* Stage progress bar */}
        <div className="px-4 pb-4 shrink-0">
          <div className="h-1 bg-surface-sunk rounded-pill overflow-hidden">
            <div
              className="h-full bg-accent rounded-pill"
              style={{
                width: `${(progress.current / progress.total) * 100}%`,
                transition: `width var(--dur-base) var(--ease)`,
              }}
            />
          </div>
        </div>

        {/* Stage transition callout — shown on the first slide of a new stage */}
        {stageChanged && (
          <div className="mx-4 mb-4 bg-surface-sunk rounded-card px-4 py-3 shrink-0">
            <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow">
              Up next
            </p>
            <p className="text-sm text-ink mt-1">{STAGE_LABELS[stage]}</p>
          </div>
        )}

        {/* Slide content */}
        <main ref={mainRef} className="flex-1 px-4 py-2 overflow-y-auto">
          <SlideContent game={game} slide={slide} />
        </main>

        {/* Ask the teacher — available throughout the session (hidden until the
            teacher function is deployed; see TEACHER_ENABLED) */}
        {TEACHER_ENABLED && (
          <div className="px-4 pt-2 pb-4 shrink-0">
            <AskTeacher game={game} />
          </div>
        )}

        {/* Spacer — reserves height equal to the fixed nav so content above stays visible */}
        <div className="shrink-0" style={{ height: "var(--nav-bar-h)" }} aria-hidden="true" />
      </div>

      {/* Sticky bottom nav — fixed, sits above the iOS safe area */}
      <div className="fixed bottom-0 inset-x-0 bg-bg border-t border-border z-10">
        <div className="max-w-[480px] mx-auto px-4 pt-4 pb-safe-area flex gap-3">
          {canGoBack && (
            <button
              onClick={handleBack}
              className="bg-surface-sunk text-ink font-medium text-base rounded-card py-4 px-6 border border-border active:opacity-80 transition-opacity"
              style={{ transitionDuration: "var(--dur-fast)" }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            className={`${canGoBack ? "flex-1" : "w-full"} bg-accent text-accent-ink font-medium text-base rounded-card py-4 px-6 shadow-1 active:opacity-80 transition-opacity`}
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            {last ? "Done" : "Next →"}
          </button>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Slide router
// ---------------------------------------------------------------------------

function SlideContent({ game, slide }: { game: GameRules; slide: SlideKind }) {
  switch (slide.kind) {
    case "pile":
      return <PileSlide pile={game.piles![slide.pileIndex]} total={game.piles!.length} index={slide.pileIndex} gameId={game.id} />;
    case "concept": {
      const entries = Object.entries(game.glossary ?? {});
      const [term, def] = entries[slide.termIndex];
      return <ConceptSlide term={term} definition={def} index={slide.termIndex} total={entries.length} />;
    }
    case "setup":
      return <SetupSlide step={game.setup[slide.stepIndex]} index={slide.stepIndex} total={game.setup.length} />;
    case "practice-intro":
      return <PracticeIntroSlide game={game} />;
    case "play-step":
      return <PlayStepSlide step={game.playLoop!.steps[slide.stepIndex]} index={slide.stepIndex} total={game.playLoop!.steps.length} />;
    case "turn-phase": {
      const phases = game.turnStructure!.phases;
      return <TurnPhaseSlide phase={phases[slide.phaseIndex]} index={slide.phaseIndex} total={phases.length} />;
    }
    case "priorities":
      return <PrioritiesSlide priorities={game.priorities!} />;
    case "end-condition":
      return <EndConditionSlide calls={game.specialCalls!} endOfRound={game.endOfRound} />;
    case "scoring":
      return <ScoringSlide game={game} scoring={game.scoring} winCondition={game.winCondition} />;
  }
}

// ---------------------------------------------------------------------------
// Shared utility
// ---------------------------------------------------------------------------

// Editorial figure plate. Until a game has its own hand-drawn SVG (only Dutch
// Blitz does today), the teaching visual is an illuminated-manual plate: a
// drop-cap monogram of the subject on paper, headed by the signature Spine and
// captioned "Fig. n". Intentional and on-brand — not an empty grey box.
function FigurePlate({ label, index }: { label?: string; index?: number }) {
  const initial = (label ?? "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <figure className="rounded-card border border-border bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-soft">
          {index != null ? `Fig. ${index}` : "Fig."}
        </span>
        <Spine />
      </div>
      <div className="flex items-center justify-center py-8">
        <span className="font-display text-3xl font-bold text-ink leading-none" aria-hidden="true">
          {initial}
        </span>
      </div>
      {label && (
        <figcaption className="border-t border-border px-4 py-2 text-center text-xs text-ink-soft">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Slide components — read from game data, never hardcode game-specific strings
// ---------------------------------------------------------------------------

function PileSlide({ pile, index, total, gameId }: { pile: PileDef; index: number; total: number; gameId: string }) {
  // TableLayout and CardSequence are Dutch-Blitz-specific SVGs; all other games
  // use the neutral placeholder until their own diagrams are built.
  const isDutchBlitz = gameId === "dutch-blitz";
  const Overview = overviewFor(gameId);
  const showTableLayout = index === 0;
  const showCardSequence = pile.sequence === "ascending" || pile.sequence === "descending";

  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          Pile {index + 1} of {total}
        </p>
        <h2 className="font-display text-2xl font-bold text-ink">{pile.name}</h2>
        {pile.location && (
          <p className="text-sm text-ink-soft mt-1">{pile.location}</p>
        )}
      </div>

      {showTableLayout && (
        <div className="rounded-card overflow-hidden border border-border bg-surface-sunk p-3">
          {Overview ? <Overview /> : <FigurePlate label={`${pile.name} — table layout`} />}
        </div>
      )}

      {pile.count && (
        <div className="bg-surface-sunk rounded-card px-4 py-3 inline-block self-start">
          <span className="text-sm font-medium text-ink">{pile.count}</span>
        </div>
      )}

      <div className="bg-surface rounded-card shadow-1 border border-border px-4 py-4">
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          What it's for
        </p>
        <p className="text-base text-ink leading-relaxed">{pile.purpose}</p>
      </div>

      {pile.sequence && pile.sequence !== "none" && (
        <p className="text-sm text-ink-soft">
          Cards are built <span className="font-medium text-ink">{pile.sequence}</span>.
        </p>
      )}

      {showCardSequence && (
        <div className="rounded-card overflow-hidden border border-border bg-surface-sunk p-3">
          {isDutchBlitz ? <CardSequence /> : <FigurePlate label={`Built ${pile.sequence}`} />}
        </div>
      )}
    </div>
  );
}

// Concept slide: glossary-term-based concept tour for turn-based games without piles.
function ConceptSlide({ term, definition, index, total }: {
  term: string;
  definition: string;
  index: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          Concept {index + 1} of {total}
        </p>
        <h2 className="font-display text-2xl font-bold text-ink">{term}</h2>
      </div>

      <FigurePlate label={term} index={index + 1} />

      <div className="bg-surface rounded-card shadow-1 border border-border px-4 py-4">
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          What it is
        </p>
        <p className="text-base text-ink leading-relaxed">{definition}</p>
      </div>
    </div>
  );
}

function SetupSlide({ step, index, total }: { step: SetupStep; index: number; total: number }) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          Step {index + 1} of {total}
        </p>
        <h2 className="font-display text-xl font-bold text-ink leading-snug">{step.instruction}</h2>
      </div>

      {step.detail && (
        <div className="bg-surface-sunk rounded-card px-4 py-3">
          <p className="text-sm text-ink-soft">{step.detail}</p>
        </div>
      )}
    </div>
  );
}

// CHANGED: branches on playModel so real-time and turn-based get appropriate wording.
function PracticeIntroSlide({ game }: { game: GameRules }) {
  const isRealTime = game.playModel === "real-time";
  const summary = isRealTime
    ? game.playLoop?.summary
    : game.turnStructure?.summary;

  // Games with pile slides (Dutch Blitz) already showed their overview diagram
  // during the concept tour; everyone else gets it here, before the walkthrough.
  const Overview = game.piles?.length ? null : overviewFor(game.id);

  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          {isRealTime ? "Coached Practice" : "How to Play"}
        </p>
        <h2 className="font-display text-2xl font-bold text-ink">
          {isRealTime ? "Let's slow it down." : "Let's walk through a turn."}
        </h2>
      </div>

      {Overview && (
        <div className="rounded-card overflow-hidden border border-border bg-surface-sunk p-3">
          <Overview />
        </div>
      )}

      {summary && (
        <div className="bg-surface rounded-card shadow-1 border border-border px-4 py-4">
          <p className="text-base text-ink leading-relaxed">{summary}</p>
        </div>
      )}

      <p className="text-sm text-ink-soft">
        {isRealTime
          ? "We'll walk through what's happening step by step, then surface the priorities that separate a good player from a confused one."
          : "We'll walk through each action you can take on your turn, so nothing surprises you at the table."}
      </p>
    </div>
  );
}

function PlayStepSlide({ step, index, total }: { step: { id: string; instruction: string; detail?: string }; index: number; total: number }) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          {index + 1} of {total} · During play
        </p>
        <h2 className="font-display text-xl font-bold text-ink leading-snug">{step.instruction}</h2>
      </div>

      {step.detail && (
        <div className="bg-surface-sunk rounded-card px-4 py-3">
          <p className="text-sm text-ink-soft">{step.detail}</p>
        </div>
      )}
    </div>
  );
}

// New: renders each phase of a turn-based game's turnStructure.
function TurnPhaseSlide({ phase, index, total }: {
  phase: { id: string; instruction: string; options?: string[]; detail?: string };
  index: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          {index + 1} of {total} · On your turn
        </p>
        <h2 className="font-display text-xl font-bold text-ink leading-snug">{phase.instruction}</h2>
      </div>

      {phase.options && phase.options.length > 0 && (
        <ul className="flex flex-col gap-3">
          {phase.options.map((opt, i) => (
            <li key={i} className="bg-surface rounded-card shadow-1 border border-border px-4 py-3 flex gap-3">
              <span className="text-ink-soft shrink-0 mt-px">—</span>
              <span className="text-sm text-ink">{opt}</span>
            </li>
          ))}
        </ul>
      )}

      {phase.detail && (
        <div className="bg-surface-sunk rounded-card px-4 py-3">
          <p className="text-sm text-ink-soft">{phase.detail}</p>
        </div>
      )}
    </div>
  );
}

function PrioritiesSlide({ priorities }: { priorities: string[] }) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          Coaching
        </p>
        <h2 className="font-display text-2xl font-bold text-ink">Keep these in mind.</h2>
      </div>

      <ul className="flex flex-col gap-3">
        {priorities.map((p, i) => (
          <li key={i} className="bg-surface rounded-card shadow-1 border border-border px-4 py-3 flex gap-3">
            <span className="text-ink-soft shrink-0 mt-px">—</span>
            <span className="text-sm text-ink">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EndConditionSlide({
  calls,
  endOfRound,
}: {
  calls: { name: string; when: string; effect: string }[];
  endOfRound?: string;
}) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          How a hand ends
        </p>
        <h2 className="font-display text-2xl font-bold text-ink">Calls to know.</h2>
      </div>

      {endOfRound && (
        <p className="text-sm text-ink-soft">{endOfRound}</p>
      )}

      <div className="flex flex-col gap-3">
        {calls.map((call) => (
          <div key={call.name} className="bg-surface rounded-card shadow-1 border border-border px-4 py-4">
            <p className="text-lg font-bold text-ink mb-3">"{call.name}"</p>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-ink">
                <span className="font-medium">When: </span>
                {call.when}
              </p>
              <p className="text-sm text-ink">
                <span className="font-medium">Effect: </span>
                {call.effect}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// scoring is optional — games without a scoring rubric still need to show the win condition.
function ScoringSlide({ game, scoring, winCondition }: { game: GameRules; scoring?: string[]; winCondition: string }) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          {scoring?.length ? "After each round" : "How to win"}
        </p>
        <h2 className="font-display text-2xl font-bold text-ink">{scoring?.length ? "Scoring." : "Win condition."}</h2>
      </div>

      {game.endOfRound && (
        <div className="bg-surface-sunk rounded-card px-4 py-3">
          <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-1">How a round ends</p>
          <p className="text-sm text-ink">{game.endOfRound}</p>
        </div>
      )}

      {scoring && scoring.length > 0 && (
        <ul className="flex flex-col gap-2">
          {scoring.map((line, i) => (
            <li key={i} className="flex gap-3 text-sm text-ink">
              <span className="text-ink-soft shrink-0 mt-px">—</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-border pt-4">
        <p className="text-xs font-medium text-ink-soft uppercase tracking-eyebrow mb-2">
          Winning
        </p>
        <p className="text-sm text-ink">{winCondition}</p>
      </div>

      <div className="bg-surface-sunk rounded-card px-4 py-6 flex flex-col items-center gap-3 text-center">
        <Spine variant="rule" className="w-24" />
        <p className="font-display text-lg font-bold text-ink">You know {game.name}.</p>
        <p className="text-sm text-ink-soft">Shuffle up and deal.</p>
      </div>
    </div>
  );
}
