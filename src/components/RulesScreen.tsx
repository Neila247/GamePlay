import type { GameRules, PileDef, SetupStep, PlayStep, TurnPhase } from "../../data/games/dutch-blitz.ts";

type Props = { game: GameRules; onStart: () => void; onBack?: () => void };

export function RulesScreen({ game, onStart, onBack }: Props) {
  return (
    <div className="min-h-screen bg-bg px-4 py-8 max-w-[480px] mx-auto">
      <header className="mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm text-ink-soft active:text-ink transition-colors mb-4 block"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            ← Back
          </button>
        )}
        <p className="text-sm text-ink-soft font-medium mb-1">Rules</p>
        <h1 className="text-2xl font-bold text-ink">{game.name}</h1>
        <div className="flex gap-2 mt-3 flex-wrap">
          <Badge>{game.players.min}–{game.players.max} players</Badge>
          {game.estimatedMinutes && (
            <Badge>~{game.estimatedMinutes} min</Badge>
          )}
          <Badge>{game.playModel === "real-time" ? "Real-time" : "Turn-based"}</Badge>
        </div>
      </header>

      <Section title="Objective">
        <p className="text-base text-ink">{game.objective}</p>
      </Section>

      {game.piles && game.piles.length > 0 && (
        <Section title="Key zones">
          <p className="text-sm text-ink-soft mb-4">
            Understanding these is 90% of the game.
          </p>
          <div className="flex flex-col gap-3">
            {game.piles.map((pile) => (
              <PileCard key={pile.name} pile={pile} />
            ))}
          </div>
        </Section>
      )}

      <Section title="Setup">
        <ol className="flex flex-col gap-3">
          {game.setup.map((step, i) => (
            <SetupItem key={step.id} step={step} index={i + 1} />
          ))}
        </ol>
      </Section>

      {game.playLoop && (
        <Section title="How a hand plays">
          <p className="text-sm text-ink-soft mb-4">{game.playLoop.summary}</p>
          <ol className="flex flex-col gap-3">
            {game.playLoop.steps.map((step, i) => (
              <PlayItem key={step.id} step={step} index={i + 1} />
            ))}
          </ol>
        </Section>
      )}

      {game.turnStructure && (
        <Section title="How a turn works">
          <p className="text-sm text-ink-soft mb-4">{game.turnStructure.summary}</p>
          <ol className="flex flex-col gap-3">
            {game.turnStructure.phases.map((phase, i) => (
              <TurnPhaseItem key={phase.id} phase={phase} index={i + 1} />
            ))}
          </ol>
        </Section>
      )}

      {game.priorities && game.priorities.length > 0 && (
        <Section title="What to focus on">
          <ul className="flex flex-col gap-2">
            {game.priorities.map((p, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink">
                <span className="text-ink-soft shrink-0 mt-px">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {game.specialCalls && game.specialCalls.length > 0 && (
        <Section title="Calls to know">
          <div className="flex flex-col gap-3">
            {game.specialCalls.map((call) => (
              <div key={call.name} className="bg-surface-sunk rounded-card px-4 py-3">
                <p className="font-bold text-ink">{call.name}</p>
                <p className="text-sm text-ink-soft mt-1">
                  <span className="font-medium text-ink">When: </span>
                  {call.when}
                </p>
                <p className="text-sm text-ink-soft mt-1">
                  <span className="font-medium text-ink">Effect: </span>
                  {call.effect}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {game.scoring && game.scoring.length > 0 && (
        <Section title="Scoring">
          <ul className="flex flex-col gap-2">
            {game.scoring.map((line, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink">
                <span className="text-ink-soft shrink-0 mt-px">—</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink-soft mt-4 border-t border-border pt-4">
            {game.winCondition}
          </p>
        </Section>
      )}

      {game.commonMistakes && game.commonMistakes.length > 0 && (
        <Section title="Common mistakes">
          <ul className="flex flex-col gap-2">
            {game.commonMistakes.map((m, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink">
                <span className="text-ink-soft shrink-0 mt-px">—</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {game.glossary && Object.keys(game.glossary).length > 0 && (
        <Section title="Glossary">
          <dl className="flex flex-col gap-3">
            {Object.entries(game.glossary).map(([term, def]) => (
              <div key={term}>
                <dt className="text-sm font-medium text-ink">{term}</dt>
                <dd className="text-sm text-ink-soft mt-1">{def}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <div className="mt-12 pb-8">
        <button
          onClick={onStart}
          className="w-full bg-accent text-accent-ink font-medium text-base rounded-card py-4 px-6 shadow-1 active:opacity-80 transition-opacity"
          style={{ transitionDuration: "var(--dur-fast)" }}
        >
          Teach me to play →
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-ink mb-4 pb-2 border-b border-border">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium text-ink-soft bg-surface-sunk border border-border rounded-pill px-3 py-1">
      {children}
    </span>
  );
}

function PileCard({ pile }: { pile: PileDef }) {
  return (
    <div className="bg-surface rounded-card shadow-1 px-4 py-3 border border-border">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-ink">{pile.name}</h3>
        {pile.count && (
          <span className="text-xs text-ink-soft shrink-0 mt-px">{pile.count}</span>
        )}
      </div>
      <p className="text-sm text-ink-soft">{pile.purpose}</p>
      {pile.sequence && pile.sequence !== "none" && (
        <p className="text-xs text-ink-soft mt-2 italic">
          Built {pile.sequence}
        </p>
      )}
    </div>
  );
}

function SetupItem({ step, index }: { step: SetupStep; index: number }) {
  return (
    <li className="flex gap-3">
      <span className="text-sm font-medium text-ink-soft shrink-0 w-4 mt-0.5">
        {index}.
      </span>
      <div>
        <p className="text-sm text-ink">{step.instruction}</p>
        {step.detail && (
          <p className="text-xs text-ink-soft mt-1">{step.detail}</p>
        )}
      </div>
    </li>
  );
}

function PlayItem({ step, index }: { step: PlayStep; index: number }) {
  return (
    <li className="flex gap-3">
      <span className="text-sm font-medium text-ink-soft shrink-0 w-4 mt-0.5">
        {index}.
      </span>
      <div>
        <p className="text-sm text-ink">{step.instruction}</p>
        {step.detail && (
          <p className="text-xs text-ink-soft mt-1">{step.detail}</p>
        )}
      </div>
    </li>
  );
}

function TurnPhaseItem({ phase, index }: { phase: TurnPhase; index: number }) {
  return (
    <li className="flex gap-3">
      <span className="text-sm font-medium text-ink-soft shrink-0 w-4 mt-0.5">
        {index}.
      </span>
      <div>
        <p className="text-sm text-ink">{phase.instruction}</p>
        {phase.options && phase.options.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1">
            {phase.options.map((opt, i) => (
              <li key={i} className="text-xs text-ink-soft flex gap-2">
                <span className="shrink-0">·</span>
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        )}
        {phase.detail && (
          <p className="text-xs text-ink-soft mt-1">{phase.detail}</p>
        )}
      </div>
    </li>
  );
}
