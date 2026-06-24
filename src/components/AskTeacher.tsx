import { useState } from "react";
import type { GameRules } from "../../data/games/dutch-blitz.ts";
import { askTeacher } from "../lib/teacher.ts";

type Props = { game: GameRules };

type Status = "idle" | "loading" | "answered" | "error";

// Flip to false once the Netlify function + API key are wired up.
const COMING_SOON = true;

// An "ask the teacher" panel, available throughout the guided session.
// The AI call fires ONLY on submit — never proactively.
export function AskTeacher({ game }: Props) {
  if (COMING_SOON) {
    return (
      <div className="w-full bg-surface-sunk border border-border rounded-card px-4 py-3 flex items-center justify-between">
        <span className="text-sm text-ink-soft">Ask the teacher</span>
        <span className="text-xs text-ink-soft bg-surface border border-border rounded-pill px-2 py-1">
          Coming soon
        </span>
      </div>
    );
  }

  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q || status === "loading") return;

    setStatus("loading");
    setAnswer("");
    setError("");
    try {
      const a = await askTeacher(game, q);
      setAnswer(a);
      setStatus("answered");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left bg-surface border border-border rounded-card px-4 py-3 text-sm font-medium text-ink-soft active:bg-surface-sunk transition-colors"
        style={{ transitionDuration: "var(--dur-fast)" }}
      >
        Ask the teacher a question
      </button>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-card px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-ink">Ask the teacher</p>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-ink-soft active:text-ink transition-colors"
          style={{ transitionDuration: "var(--dur-fast)" }}
        >
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. Can I play a card from my Wood Pile to the centre?"
          rows={2}
          className="w-full resize-none bg-surface-sunk border border-border rounded-sm px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-accent transition-colors"
          style={{ transitionDuration: "var(--dur-fast)" }}
        />
        <button
          type="submit"
          disabled={!question.trim() || status === "loading"}
          className="self-start bg-accent text-accent-ink font-medium text-sm rounded-sm py-2 px-4 active:opacity-80 transition-opacity disabled:opacity-40"
          style={{ transitionDuration: "var(--dur-fast)" }}
        >
          {status === "loading" ? "Asking…" : "Ask"}
        </button>
      </form>

      {status === "answered" && answer && (
        <div className="mt-4 bg-surface-sunk rounded-card px-4 py-3">
          <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">
            Teacher
          </p>
          <p className="text-sm text-ink whitespace-pre-wrap leading-relaxed">{answer}</p>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 border border-warn rounded-card px-4 py-3">
          <p className="text-sm text-warn">{error}</p>
        </div>
      )}
    </div>
  );
}
