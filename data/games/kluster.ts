// kluster.ts
// Hand-authored, verified rule record for Kluster, transcribed from the official rulebook.
import type { GameRules } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const kluster: GameRules = {
  id: "kluster",
  name: "Kluster",
  source: "hand-authored",
  verified: true,
  players: { min: 1, max: 4 },
  ageRecommendation: 14,
  playModel: "turn-based",

  components: [
    "24 magnetic stones",
    "1 cord",
  ],

  objective:
    "Be the first player to place all of your magnetic stones inside the area delimited by the cord without any stones clustering together.",

  setup: [
    {
      id: "lay-cord",
      instruction: "Lay the cord in any shape you like on a flat, horizontal surface.",
    },
    {
      id: "distribute-stones",
      instruction: "Divide the 24 magnetic stones evenly between all players.",
      detail: "With 2 players each gets 12; with 3 players each gets 8; with 4 players each gets 6.",
    },
    {
      id: "first-player",
      instruction:
        "The player with the most stones left at the end of the previous game goes first. For the very first game, the smallest player (by height) goes first.",
    },
  ],

  turnStructure: {
    summary:
      "Players take turns clockwise. On your turn, place one of your stones entirely inside the cord area. If any stones kluster (stick together) or leave the area, you collect all affected stones and your turn ends immediately.",
    phases: [
      {
        id: "place-stone",
        instruction:
          "Place one of your stones entirely inside the area delimited by the cord.",
        detail:
          "You may not touch the stones already placed in the playing area with your hand.",
      },
      {
        id: "move-cord",
        instruction:
          "Optionally, before or instead of placing your stone, move the cord (and thereby indirectly move some stones), as long as it stays flat on the playing surface and no stones kluster in the process.",
      },
      {
        id: "use-magnetism",
        instruction:
          "You may also use the magnetism of the stones in your hand to move stones already inside the playing area.",
        detail:
          "If any stones kluster together as a result, you must pick them all up and your turn ends immediately.",
      },
      {
        id: "kluster-penalty",
        instruction:
          "If at any point during your turn stones kluster together or exit the playing area, collect all affected stones (even ones you did not touch) and your turn ends immediately — even if you had not yet placed a stone.",
      },
    ],
  },

  winCondition:
    "The first player to successfully place their last stone inside the playing area wins.",

  rulesToObserve: [
    "You may not touch the stones already laid in the playing area directly with your hand.",
    "The cord must remain flat on the playing surface at all times.",
    "If stones kluster or exit the area during your turn, you collect all of them and your turn ends — even if you hadn't placed a stone yet.",
    "You may use the magnetism of your hand-held stones to move placed stones, but any resulting kluster means you pick them all up.",
  ],

  glossary: {
    Kluster:
      "When two or more magnetic stones snap together. Causes the active player to collect all joined stones and end their turn.",
  },
};

// Solo variant (not a separate GameRules record — documented here for the teacher):
// All normal rules apply, but you may only kluster twice (each kluster = 1 fault; 2 faults maximum).
// The goal is to place as many of the 24 stones as possible. Placing all 24 is a total victory.

// ---------------------------------------------------------------------------
// Build-time validation — runs at import, throws if the record is malformed.
// ---------------------------------------------------------------------------
validateGameRules(kluster);
