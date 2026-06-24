# Onboard — v1 Spec

Working title: **Onboard**. v1 goal: prove the full loop on a single trusted
game (**Dutch Blitz**) while gracefully handling anything else.

## 1. The loop

```
[ Home ]
   │  scan box  ──or──  search by name
   ▼
[ Identify ]  → best-guess game + confidence
   │  match in curated data?
   ├── yes → load hand-authored record (verified)
   └── no  → generate record via LLM (UNVERIFIED badge)
   ▼
[ Rules screen ]  simplified, skimmable: objective, the pile types,
   │              setup, how a hand plays, how scoring works
   │  "Teach me to play →"
   ▼
[ Guided session ]  branches on playModel (see §4)
   │
   ▼
[ Done ]  → replay / pick another game
```

## 2. Screens

**Home.** Big scan button, secondary search field, list of recently played /
curated games. Mobile-first, table-friendly (large tap targets).

**Identify.** Camera capture → loading → "Looks like *Dutch Blitz* — right?"
with a confirm + "search instead" escape. Confidence below a threshold skips
straight to search.

**Rules screen.** The "remind me how this works" view. Sections render from the
schema: objective, pile types (`piles`), setup, the play loop (`playLoop`) or
turn structure, scoring, common mistakes. Must be skimmable in under a minute.
UNVERIFIED games show a persistent banner.

**Guided session.** See §4 — the shape depends on `playModel`.

## 3. Rule-data schema

The heart of the app. Both authored and generated games use one shape, so the
teacher and guided session never care where a game came from. The canonical,
build-validated definition lives in `/data/games/dutch-blitz.ts` — that file
holds both the `GameRules` type and the verified Dutch Blitz record. Summary:

- `id`, `name`, `source`, `verified`, `players {min,max}`, optional age/time
- `playModel: "turn-based" | "real-time"` — drives the teaching mode
- `components: string[]`
- `objective: string`
- `piles?: PileDef[]` — pile/zone definitions (central for games like Dutch
  Blitz where understanding the zones IS most of the learning)
- `setup: SetupStep[]`
- `turnStructure?` — turn-based games only (summary + ordered phases)
- `playLoop?` — real-time games only (summary + the repeating loop, in
  priority order)
- `priorities?: string[]` — strategic "what to focus on" (real-time esp.)
- `specialCalls?` — mid-game shouts like "Blitz!" / "Dutch!"
- `endOfRound?`, `winCondition`, `scoring?`
- `rulesToObserve?`, `commonMistakes?`, `glossary?`

Validate every game record against `GameRules` at build time. A malformed
authored record should fail the build, not ship.

## 4. Guided session, by play model

**turn-based** (future games like Uno): one instruction at a time. Confirm to
advance setup; per turn, state whose turn it is, list options in plain
language, wait for what the player did, advance. Always-available "ask the
teacher" input answers from the rule data.

**real-time** (Dutch Blitz, v1): there are no turns, so no turn prompts.
Three stages instead:
1. **Concept tour** — walk the four pile types (Blitz, Post, Wood, the shared
   Dutch Piles) and what each is *for*. This is the part everyone bounces off.
2. **Setup walkthrough** — confirm each `setup` step one at a time.
3. **Coached practice** — slow the `playLoop` down and coach the `priorities`
   ("any exposed 1 goes to the centre", "prefer plays from your Blitz Pile —
   it's the whole point"), rather than prompting individual moves. End on the
   "Blitz!" condition and explain scoring.

"Ask the teacher" is available throughout, answering only from the rule data.

## 5. The teacher prompt (grounding contract)

The teacher Netlify Function receives: the relevant `GameRules` slice + the
current session state + the user's message. The system prompt instructs:

- Answer **only** from the supplied rule data.
- If the data doesn't cover the question, say so plainly and suggest checking
  the rulebook — do not improvise a ruling.
- Keep it short and warm, one step at a time, like teaching a friend at the
  table.
- For UNVERIFIED games, hedge appropriately.

This is what makes the hybrid safe: the model reads and explains trusted data,
it does not recall rules.

## 6. Long-tail generation

When no curated record exists, a separate function asks the model to produce a
`GameRules` object (JSON only, validated against the schema) for the named
game, with `source: "llm-generated"`, `verified: false`. The UI badges it
clearly. Optionally cache generated records (Supabase) so the second person to
scan that game gets it instantly — but caching a *generated* record never
promotes it to verified.

## 7. Build order (suggested)

1. Schema + types + the hand-authored Dutch Blitz record. Validate it.
   (Already drafted in `/data/games/dutch-blitz.ts`.)
2. Rules screen rendering purely from the Dutch Blitz record (no AI yet).
3. Guided-session state machine over the record — real-time branch: concept
   tour → setup → coached loop. Hard-code the narration first, prove the flow.
4. Teacher function: swap hard-coded narration for grounded LLM responses; add
   the "ask the teacher" input.
5. Search-by-name → curated lookup.
6. Long-tail LLM generation + UNVERIFIED badge.
7. Photo identify (last — it's the shortcut, not the spine).

Doing AI last on each feature means you always have a working non-AI version
to fall back to, and you never confuse "the flow is broken" with "the prompt
is bad."

## 8. Open questions for Neil

- One curated game (Dutch Blitz) or three for v1? (Dutch Blitz alone is a
  defensible v1.)
- Voice? You said "the app talks to you" — text-first is far cheaper to build
  and debug; add TTS later as polish. Agree?
- Persistence: do you want "resume a session" in v1, or is each one fresh?
