# CLAUDE.md — Onboard

> Working title: **Onboard** (board games + onboarding). Rename freely.
> This file is the persistent contract for the project. Read it before every task.

## Project files

These are imported so they load with every session:

- @SPEC.md — the v1 product spec, screens, schema, and build order.
- @DESIGN.md — the design tokens and the "avoid" list. Obey on every screen.

The verified rule data lives at `data/games/dutch-blitz.ts` (the canonical
`GameRules` type + the Dutch Blitz record). Read it whenever working on the
rules screen, the guided session, or anything touching game logic.

## What this app is

A webapp that teaches you a board game you already own. You scan the box (or
search by name), get **simplified, trustworthy** rules, and can start a
**guided learning session** that walks you through how to actually play.

The problem it solves: rulebooks are dense, you end up watching a YouTube
video, and two months later you've forgotten everything.

v1 game: **Dutch Blitz** (hand-authored, verified — see `/data/games/dutch-blitz.ts`).

## The one rule that matters most

**The LLM never invents rules for a hand-authored game.** For our curated
games, the structured rule data in `/data/games/` is the single source of
truth. The model's job is to *teach from that data* — pacing it, phrasing it
warmly, answering "can I do X?" by reading the data — not to recall rules from
its own training. If the data doesn't cover something, the teacher says so
rather than guessing.

For long-tail games we don't have data for, the model may generate rules, but
those are always rendered as **UNVERIFIED** in the UI (see Rules sourcing).

Wrong rules are worse than no rules. A user has no way to know they're being
misled, they lose the game, and they blame themselves. Treat rule accuracy as
the core product value, not a detail.

## Rules sourcing (hybrid)

Every game record carries `source` and `verified`:

- `source: "hand-authored"`, `verified: true` — curated by us, transcribed
  from the official rulebook. Teacher reads strictly from the data. This is
  the gold path. Dutch Blitz is the flagship; all 14 curated records have been
  **cross-checked against their official rulebook PDFs** in `/game_rules PDFs/`
  (one folder per game). Those PDFs are the verification source of truth — when
  editing a curated record, re-check it against the matching PDF, and treat any
  mismatch between data and rulebook as a bug in the data.
- `source: "llm-generated"`, `verified: false` — generated on demand for a
  game we don't have. Must be visibly flagged in the UI ("AI-generated, double
  check against your rulebook"). Never silently mixed in with verified games.

Generated rules must be produced into the **same schema** as authored ones, so
the teacher layer is identical — the only difference is the trust badge.

## Photo / box recognition

The camera is a **shortcut, not a gate.** Always offer a manual name search
alongside it. Recognition will fail on glare, foreign editions, and
expansions — when it does, fall back to search, never to a dead end. Don't let
the MVP's success depend on OCR working.

## Two play models — pick the teaching mode per game

The schema carries `playModel: "turn-based" | "real-time"`. The teaching mode
branches on it:

- **turn-based** (e.g. Uno): guided game = a turn-by-turn walkthrough. State
  whose turn it is, list the player's options, wait for what they did, advance.
- **real-time** (e.g. Dutch Blitz): there are NO turns — everyone plays at once.
  A turn-prompter makes no sense. Guided game = **concept tour + setup
  walkthrough + coached practice loop**:
  1. Concept tour — teach the pile types and what each is *for* (this is where
     people get lost).
  2. Setup walkthrough — confirm each setup step, one at a time.
  3. Coached practice — slow the core loop down and coach priorities
     ("hunt for 1s, feed your Blitz Pile") rather than prompting turns.

Model the guided session as a **state machine driven by the rule data**, with
the LLM as narrator/answerer. A full multiplayer rules engine is out of scope.

## Stack & conventions

- React + Vite + Tailwind (match Neil's existing projects).
- Netlify + Netlify Functions for the backend.
- **All Anthropic API calls go through a Netlify Function.** The API key is a
  server-side env var (`ANTHROPIC_API_KEY`) and must never reach the client
  bundle.
- Supabase for game data + saved games if/when persistence is needed. For the
  v1 hand-authored set, static data in the repo is fine — don't add Supabase
  before it earns its place.
- Mobile-first. People scan a box and play at a table; this is a phone app
  that happens to run in a browser. PWA-installable is a nice-to-have.
- Keep components small. Co-locate the rule-data schema types and validate
  game data against them at build time.
- Visual design direction lives in `DESIGN.md` (committed tokens + an explicit
  "avoid" list of AI tells). Obey it on every screen; never reach for defaults.

## Styling discipline (enforced from the first commit)

The visual direction is intentionally undecided during the PoC — but the app
must be built so a future re-skin is a config change, not a rewrite.

- **No raw style values in components, ever.** Colour, spacing, type size,
  font family, radius, and shadow always come from named design tokens
  (Tailwind theme config / CSS variables defined per `DESIGN.md`). Never
  hardcode a hex value, a pixel size, or an arbitrary Tailwind value like
  `rounded-[14px]` or `bg-[#7c3aed]` inline.
- Use semantic token names (`surface`, `ink`, `accent`, `radius-card`), not
  literal ones (`gray-100`, `violet-600`). Swapping the skin then means editing
  token values in one place, with no component changes.
- If a needed token doesn't exist, add it to the token set and reference it —
  don't inline a one-off value.
- PoC skin is deliberately plain and neutral (near-greybox): clean, but
  unopinionated, so the look doesn't bias whether the *concept* works. Polish
  comes after the PoC, by editing tokens — not by touching components.

This rule is cheap now and makes the eventual re-skin trivial. Treat any
inline raw style value as a bug.

## Model usage

- Use `claude-sonnet-4-6` for the teacher and for long-tail rule generation.
- Photo identification: send the image to the vision-capable model, ask only
  for a best-guess game name + confidence, then look that up. Don't ask the
  vision call to produce rules directly.
- Keep the teacher grounded: pass the relevant slice of structured rule data
  into the prompt as context and instruct the model to answer only from it.

## Out of scope for v1 (write it down so we don't drift)

- Multiplayer / shared sessions
- Full game-state simulation / AI opponents
- Accounts and cloud sync (local state is fine for v1)
- More than ~1–3 curated games
- Expansions, variants, house rules editor

## Definition of done for v1

Scan or search → Dutch Blitz → simplified rules screen (pile types,
objective, setup, how a hand plays, scoring) → start guided session → app
teaches the pile types, walks through setup, and coaches the core loop →
"Blitz!" end + scoring explained. Plus: search any other game → LLM rules
clearly badged UNVERIFIED.
