import { useState } from "react";
import type { GameRules, PileDef, SetupStep, PlayStep } from "../../data/games/dutch-blitz.ts";
import { TableLayout } from "./diagrams/TableLayout.tsx";
import { CardSequence } from "./diagrams/CardSequence.tsx";
import {
  initSession, advance, current, isLast, stageOf, stageProgress,
  STAGE_LABELS,
  type SlideKind,
} from "../lib/session.ts";
import { AskTeacher } from "./AskTeacher.tsx";

type Props = { game: GameRules; onExit: () => void };

export function GuidedSession({ game, onExit }: Props) {
  const [state, setState] = useState(() => initSession(game));
  const slide = current(state);

  if (!slide) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <p className="text-ink-soft text-sm">No guided session available for this game yet.</p>
      </div>
    );
  }

  const stage = stageOf(slide);
  const progress = stageProgress(state, slide);
  const last = isLast(state);
  const prevStage = state.index > 0 ? stageOf(state.slides[state.index - 1]) : null;
  const stageChanged = prevStage !== null && prevStage !== stage;

  function handleNext() {
    if (last) {
      onExit();
    } else {
      setState(advance(state));
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col max-w-[480px] mx-auto">
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
          <p className="text-xs font-medium text-ink-soft uppercase tracking-wide">
            Up next
          </p>
          <p className="text-sm text-ink mt-1">{STAGE_LABELS[stage]}</p>
        </div>
      )}

      {/* Slide content */}
      <main className="flex-1 px-4 py-2 overflow-y-auto">
        <SlideContent game={game} slide={slide} />
      </main>

      {/* Ask the teacher — available throughout the session */}
      <div className="px-4 pt-2 shrink-0">
        <AskTeacher game={game} />
      </div>

      {/* CTA */}
      <div className="px-4 pt-4 pb-8 shrink-0">
        <button
          onClick={handleNext}
          className="w-full bg-accent text-accent-ink font-medium text-base rounded-card py-4 px-6 shadow-1 active:opacity-80 transition-opacity"
          style={{ transitionDuration: "var(--dur-fast)" }}
        >
          {last ? "Done" : "Next →"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Slide router
// ---------------------------------------------------------------------------

function SlideContent({ game, slide }: { game: GameRules; slide: SlideKind }) {
  switch (slide.kind) {
    case "pile":
      return <PileSlide pile={game.piles![slide.pileIndex]} total={game.piles!.length} index={slide.pileIndex} />;
    case "setup":
      return <SetupSlide step={game.setup[slide.stepIndex]} index={slide.stepIndex} total={game.setup.length} />;
    case "practice-intro":
      return <PracticeIntroSlide game={game} />;
    case "play-step":
      return <PlayStepSlide step={game.playLoop!.steps[slide.stepIndex]} index={slide.stepIndex} total={game.playLoop!.steps.length} />;
    case "priorities":
      return <PrioritiesSlide priorities={game.priorities!} />;
    case "end-condition":
      return <EndConditionSlide calls={game.specialCalls!} endOfRound={game.endOfRound} />;
    case "scoring":
      return <ScoringSlide scoring={game.scoring!} winCondition={game.winCondition} />;
  }
}

// ---------------------------------------------------------------------------
// Slide components — read from game data, never hardcode game-specific strings
// ---------------------------------------------------------------------------

function PileSlide({ pile, index, total }: { pile: PileDef; index: number; total: number }) {
  const showTableLayout = index === 0;
  const showCardSequence = pile.sequence === "ascending" || pile.sequence === "descending";

  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">
          Pile {index + 1} of {total}
        </p>
        <h2 className="text-2xl font-bold text-ink">{pile.name}</h2>
        {pile.location && (
          <p className="text-sm text-ink-soft mt-1">{pile.location}</p>
        )}
      </div>

      {showTableLayout && (
        <div className="rounded-card overflow-hidden border border-border bg-surface-sunk p-3">
          <TableLayout />
        </div>
      )}

      {pile.count && (
        <div className="bg-surface-sunk rounded-card px-4 py-3 inline-block self-start">
          <span className="text-sm font-medium text-ink">{pile.count}</span>
        </div>
      )}

      <div className="bg-surface rounded-card shadow-1 border border-border px-4 py-4">
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">
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
          <CardSequence />
        </div>
      )}
    </div>
  );
}

function SetupSlide({ step, index, total }: { step: SetupStep; index: number; total: number }) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">
          Step {index + 1} of {total}
        </p>
        <h2 className="text-xl font-bold text-ink leading-snug">{step.instruction}</h2>
      </div>

      {step.detail && (
        <div className="bg-surface-sunk rounded-card px-4 py-3">
          <p className="text-sm text-ink-soft">{step.detail}</p>
        </div>
      )}
    </div>
  );
}

function PracticeIntroSlide({ game }: { game: GameRules }) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">
          Coached Practice
        </p>
        <h2 className="text-2xl font-bold text-ink">Let's slow it down.</h2>
      </div>

      {game.playLoop && (
        <div className="bg-surface rounded-card shadow-1 border border-border px-4 py-4">
          <p className="text-base text-ink leading-relaxed">{game.playLoop.summary}</p>
        </div>
      )}

      <p className="text-sm text-ink-soft">
        We'll walk through what's happening step by step, then surface the priorities
        that separate a good player from a confused one.
      </p>
    </div>
  );
}

function PlayStepSlide({ step, index, total }: { step: PlayStep; index: number; total: number }) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">
          {index + 1} of {total} · During play
        </p>
        <h2 className="text-xl font-bold text-ink leading-snug">{step.instruction}</h2>
      </div>

      {step.detail && (
        <div className="bg-surface-sunk rounded-card px-4 py-3">
          <p className="text-sm text-ink-soft">{step.detail}</p>
        </div>
      )}
    </div>
  );
}

function PrioritiesSlide({ priorities }: { priorities: string[] }) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">
          Coaching
        </p>
        <h2 className="text-2xl font-bold text-ink">Keep these in mind.</h2>
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
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">
          How a hand ends
        </p>
        <h2 className="text-2xl font-bold text-ink">Calls to know.</h2>
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

function ScoringSlide({ scoring, winCondition }: { scoring: string[]; winCondition: string }) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">
          After each hand
        </p>
        <h2 className="text-2xl font-bold text-ink">Scoring.</h2>
      </div>

      <ul className="flex flex-col gap-2">
        {scoring.map((line, i) => (
          <li key={i} className="flex gap-3 text-sm text-ink">
            <span className="text-ink-soft shrink-0 mt-px">—</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-border pt-4">
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">
          Winning
        </p>
        <p className="text-sm text-ink">{winCondition}</p>
      </div>

      <div className="bg-surface-sunk rounded-card px-4 py-4 text-center">
        <p className="text-base font-medium text-ink">You know Dutch Blitz.</p>
        <p className="text-sm text-ink-soft mt-1">Shuffle up and deal.</p>
      </div>
    </div>
  );
}
