# Step 4 — Self-Verify Report

**Date:** 2026-06-24  
**Build:** `tsc --noEmit` passes clean (0 errors, strict mode).  
**Browser test:** automated slide-runner drove all 14 games from concept tour → scoring/win condition. 0 JS errors in every run.

## Results by game

| Game | Slides | Errors | Notes |
|---|---|---|---|
| Land vs Sea | 25 | 0 | Turn-based; has specialCalls (Volcano/Whirlpool) |
| Paris | 13 | 0 | Turn-based with piles; DiagramPlaceholder shown |
| Kites | 13 | 0 | Real-time, no piles; concept tour skips to setup |
| Jaipur | 22 | 0 | Turn-based; 6-term glossary concept tour |
| Fungi/Morels | 14 | 0 | Turn-based with piles; DiagramPlaceholder shown |
| High Society | 12 | 0 | Turn-based |
| Kluster | 10 | 0 | Turn-based; no scoring array, win-condition slide renders |
| Skull | 15 | 0 | Turn-based |
| Sushi Go! | 15 | 0 | Turn-based |
| Dutch Blitz | 17 | 0 | Real-time; TableLayout/CardSequence diagrams still shown |
| UNO Flip! | 16 | 0 | Turn-based; has specialCalls (Flip!) |
| The Mind | 12 | 0 | Real-time, no piles, no scoring array |
| Monopoly Deal | 24 | 0 | Turn-based |
| CABO | 13 | 0 | Turn-based |

All 14 render cleanly through the full session flow.

## Dutch Blitz assumptions generalised

1. **PileSlide diagrams** — `TableLayout` and `CardSequence` are now gated on `gameId === "dutch-blitz"`. All other games with piles (Paris, Fungi/Morels) show a neutral `DiagramPlaceholder`.
2. **Scoring slide** — was gated on `game.scoring?.length > 0`. Now always emitted; `ScoringSlide` accepts `scoring?: string[]` and shows the win condition heading when the array is absent.
3. **`ScoringSlide` heading** — was hardcoded "Dutch Blitz says…"; now uses `game.name`.
4. **Concept tour** — real-time branch used pile slides; turn-based branch now uses glossary terms (`{ kind: "concept" }`) when no piles are defined. This covers Jaipur, CABO, Kluster, Skull, etc.
5. **Practice intro copy** — was hardcoded for real-time ("slow the loop down"). Now branches: real-time → playLoop summary, turn-based → turnStructure summary.
6. **Engine slide builders** — `buildRealTimeSlides` / `buildTurnBasedSlides` branch on `playModel`, never on game id. Zero game-specific logic remains in the session engine.

## Player count flags (Step 1)

- **CABO** — rulebook states "2+ players" with no printed upper limit. Set to `max: 6` (practical ceiling given the 4-card 2×2 formation mechanic and memory overhead at larger counts). The `99` placeholder from generation was corrected.
- All other games had explicit min/max in their rulebooks and were transcribed as-is.
