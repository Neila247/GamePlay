# Onboard — v1 Spec

Working title: **Onboard**. v1 goal: prove the full teaching loop across
**14 curated, hand-authored games** (Dutch Blitz as the flagship real-time
game; 11 turn-based titles including UNO Flip!, Jaipur, Skull, and others).

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
[ Rules screen ]  simplified, skimmable: objective, pile/zone types,
   │              setup, play loop or turn structure, scoring
   │  "Teach me to play →"
   ▼
[ Guided session ]  branches on playModel (see §4)
   │
   ▼
[ Done ]  → replay / pick another game
```

## 2. Screens

**Home.** Landing page shows a grid of all 14 curated game tiles (cover
images, name, player count). Mobile-first, table-friendly (large tap targets).
Scan button and search field are secondary entry points.

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

The session engine (`src/lib/session.ts`) is a **pure state machine over
`GameRules` data** — it branches on `playModel`, never on game id. Narration
is generated from the structured record; no game-specific logic lives outside
the data files.

**real-time** (Dutch Blitz, Kites, The Mind — 3 of the 14 curated games):
there are no turns, so no turn prompts. Three stages:
1. **Concept tour** — one slide per pile/zone (`piles[]`), explaining what
   each is *for*. This is where people bounce off real-time games.
2. **Setup walkthrough** — confirm each `setup` step one at a time.
3. **Coached practice** — walk the `playLoop` steps, then coach `priorities`
   (e.g. "hunt for 1s, feed your Blitz Pile"), end on the `specialCalls`
   condition and explain scoring.

**turn-based** (UNO Flip!, Jaipur, Skull, and 8 others — 11 of the 14):
there are no pile definitions, so the concept tour uses the `glossary` as the
mental-model step. Three stages:
1. **Concept tour** — one slide per key `glossary` term.
2. **Setup walkthrough** — confirm each `setup` step one at a time.
3. **How to play** — walk the `turnStructure` phases, then `priorities` and
   win condition.

"Ask the teacher" (see §5) is available throughout all stages.

## 5. The teacher prompt (grounding contract)

The Netlify Function at `netlify/functions/teacher.mts` is **scaffolded and
structurally complete** — routing, validation, response shaping. The Anthropic
API call in `netlify/lib/teacher-core.ts` is ready. The UI component
(`AskTeacher.tsx`) is built and wired to `src/lib/teacher.ts`; it renders a
"Coming soon" placeholder (`COMING_SOON = true`) until the function is deployed
with `ANTHROPIC_API_KEY` set.

**Pending:** deploy the Netlify function and flip `COMING_SOON` to `false`.

The grounding contract:
- Answer **only** from the supplied rule data.
- If the data doesn't cover the question, say so plainly and suggest checking
  the rulebook — do not improvise a ruling.
- Keep it short and warm, one step at a time, like teaching a friend at the
  table.
- For UNVERIFIED games, hedge appropriately.

This is what makes the hybrid safe: the model reads and explains trusted data,
it does not recall rules.

## 6. Long-tail generation

**Not yet built.** When no curated record exists, a separate function will ask
the model to produce a `GameRules` object (JSON only, validated against the
schema) for the named game, with `source: "llm-generated"`, `verified: false`.
The UI will badge it clearly. Optionally cache generated records (Supabase) so
the second person to scan that game gets it instantly — but caching a
*generated* record never promotes it to verified.

## 7. Build order

**Done:**
1. ✅ Schema + types + hand-authored Dutch Blitz record. Build-time validation.
2. ✅ Rules screen rendering from any `GameRules` record.
3. ✅ Guided-session state machine — both `real-time` and `turn-based` branches,
   driven by data, hard-coded narration. Verified end-to-end for all 14 games.
4. ✅ All 14 curated, hand-authored, verified game records in `/data/games/`.
5. ✅ Home landing page with 14 game tiles (cover images, search by name).
6. ✅ Teacher function scaffolded: `netlify/functions/teacher.mts` +
   `netlify/lib/teacher-core.ts` + `AskTeacher.tsx` UI component.
7. ✅ SVG diagrams for Dutch Blitz pile types (`TableLayout`, `CardSequence`).

**Pending:**
- Deploy teacher Netlify function with `ANTHROPIC_API_KEY`; flip
  `COMING_SOON` to `false` in `AskTeacher.tsx`.
- SVG / visual diagrams for the remaining 13 games (all use
  `DiagramPlaceholder` today).
- Long-tail LLM generation + UNVERIFIED badge (§6).
- Photo identify via camera (last — it's the shortcut, not the spine).

## 8. Decisions made

- **Scope:** 14 curated games for v1 (not 1–3). Dutch Blitz remains the
  flagship; the data-driven engine means adding a game is a single data file,
  not new code.
- **Voice:** text-first. TTS is a polish step after the core loop is proven.
- **Persistence:** sessions are fresh each time. No resume-a-session in v1;
  local state only, no Supabase until it earns its place.
