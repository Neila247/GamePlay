// dutch-blitz.ts
// Hand-authored, verified rule record for Dutch Blitz, transcribed from the
// official 2005 Dutch Blitz Game Company rulebook. This is GROUND TRUTH — the
// teacher reads from this, it does not recall Dutch Blitz from training.
//
// Schema supports real-time games via `playModel`.
// validateGameRules() is called at the bottom — a malformed record fails the build.

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------
// Build-time validation is called at the bottom of this file.
// A malformed record throws at import time, failing the build.

export type PlayModel = "turn-based" | "real-time";

export type GameRules = {
  id: string;
  name: string;
  source: "hand-authored" | "llm-generated";
  verified: boolean;
  players: { min: number; max: number };
  ageRecommendation?: number;
  estimatedMinutes?: number;

  /** Drives which teaching mode the app uses. Dutch Blitz is "real-time". */
  playModel: PlayModel;

  components: string[];
  objective: string;

  /** Pile/zone definitions. Central to teaching games with multiple zones. */
  piles?: PileDef[];

  setup: SetupStep[];

  /** Turn-based games only (e.g. Uno). */
  turnStructure?: { summary: string; phases: TurnPhase[] };

  /** Real-time games only. The loop a player repeats, in priority order. */
  playLoop?: { summary: string; steps: PlayStep[] };

  /** Strategic "what to focus on" — matters most for real-time games. */
  priorities?: string[];

  /** Mid-game calls players shout, e.g. "Blitz!", "Dutch!". */
  specialCalls?: { name: string; when: string; effect: string }[];

  endOfRound?: string; // how a single hand/round ends
  winCondition: string; // how the overall game is won
  scoring?: string[];

  rulesToObserve?: string[]; // explicit do/don't from the rulebook
  commonMistakes?: string[];
  glossary?: Record<string, string>;
};

export type PileDef = {
  name: string;
  count?: string; // e.g. "10 cards", "3 (5 with 2 players)"
  location?: string;
  sequence?: "ascending" | "descending" | "none";
  purpose: string;
};

export type SetupStep = { id: string; instruction: string; detail?: string };
export type TurnPhase = {
  id: string;
  instruction: string;
  options?: string[];
  detail?: string;
};
export type PlayStep = {
  id: string;
  instruction: string;
  detail?: string;
};

// ---------------------------------------------------------------------------
// Dutch Blitz
// ---------------------------------------------------------------------------

export const dutchBlitz: GameRules = {
  id: "dutch-blitz",
  name: "Dutch Blitz",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 4 },
  estimatedMinutes: 20,
  playModel: "real-time",

  components: [
    "Four 40-card decks (160 cards total), one design per deck: Pump, Carriage, Pail, Plow",
    "Each deck has cards in four colours — red, blue, yellow, green — numbered 1 to 10",
    "Red and blue cards show a Pennsylvania Dutch Boy; yellow and green show a Dutch Girl",
    "Each player picks one design and keeps it for the whole game",
  ],

  objective:
    "Play cards onto the shared centre piles to score points — while racing to empty your own Blitz Pile, because every card left in it counts against you.",

  piles: [
    {
      name: "Blitz Pile",
      count: "10 cards",
      location: "in line with your Post Piles",
      purpose:
        "Your most important pile. Emptying it ends the hand ('Blitz!') and avoids the -2 penalty per leftover card. Only the top card can be played, and it can never be shuffled.",
    },
    {
      name: "Post Piles",
      count: "3 piles (5 if only 2 players)",
      location: "to the left of your Blitz and Wood piles",
      sequence: "descending",
      purpose:
        "Your working/trading area. Built DOWN (e.g. 7 on 8) and must ALTERNATE boy/girl cards. When you use a Post Pile card, refill the gap from the top of your Blitz Pile.",
    },
    {
      name: "Wood Pile",
      location: "to the right, built from cards in your hand",
      purpose:
        "Where you turn up cards from your hand, three at a time. Only the top card is playable. Don't over-build from it — you can tie up valuable cards.",
    },
    {
      name: "Dutch Piles",
      count: "shared, in the centre",
      location: "centre of the table, shared by everyone",
      sequence: "ascending",
      purpose:
        "The scoring piles. Each starts with a Number 1 and builds UP 1→10 in a single colour. Anyone may play on any Dutch Pile. Every card you land here is worth 1 point.",
    },
  ],

  setup: [
    {
      id: "shuffle",
      instruction: "Each player shuffles their own 40-card deck face down.",
    },
    {
      id: "post-piles",
      instruction:
        "Deal the top 3 cards face up in a row in front of you — these are your Post Piles.",
      detail: "If only 2 players, deal 5 Post Piles instead of 3.",
    },
    {
      id: "blitz-pile",
      instruction:
        "Count off the next 10 cards and place them in one face-up pile to the right of your Post Piles. This is your Blitz Pile.",
    },
    {
      id: "hand",
      instruction:
        "Hold the remaining cards face down in your hand. Everyone is now ready.",
      detail:
        "That's 27 cards in hand (or 25 with 2 players). The Dutch Piles area in the centre starts empty.",
    },
  ],

  playLoop: {
    summary:
      "There are NO turns. Once someone gives the signal, everyone plays at the same time, as fast as they can, until a player empties their Blitz Pile.",
    steps: [
      {
        id: "ones",
        instruction:
          "Any exposed Number 1 (from any of your piles) MUST go to the centre to start a Dutch Pile, regardless of colour.",
      },
      {
        id: "build-dutch",
        instruction:
          "Build the centre Dutch Piles upward in the same colour: a 2 on a 1, a 3 on that 2, and so on up to 10. You can play onto anyone's Dutch Pile.",
      },
      {
        id: "feed-blitz",
        instruction:
          "Prefer playing from your Blitz Pile — emptying it is the goal. When you use a Post Pile card, immediately refill that spot from the top of your Blitz Pile.",
      },
      {
        id: "post-and-wood",
        instruction:
          "Use your Post Piles (build down, alternating boy/girl) and the top of your Wood Pile to free up cards and create plays.",
      },
      {
        id: "cycle-hand",
        instruction:
          "When you can't play anything to the centre, turn up cards from your hand THREE at a time onto your Wood Pile (third card ends on top). Keep cycling through your hand in threes.",
      },
    ],
  },

  priorities: [
    "Empty your Blitz Pile — it's the whole point, and each leftover card is -2 at scoring.",
    "Give Blitz Pile plays preference over Post Pile or Wood Pile plays.",
    "Don't over-build from the Wood Pile; it can lock up cards you need.",
    "Only the lowest exposed card on each Post Pile is available for the Dutch Piles.",
  ],

  specialCalls: [
    {
      name: "Blitz!",
      when: "A player uses the last card in their Blitz Pile.",
      effect: "All play stops immediately and the hand ends.",
    },
    {
      name: "Dutch!",
      when: "Anyone spots a misplay (e.g. a card placed out of sequence or wrong colour).",
      effect:
        "Everyone stops; the misplaced cards are returned to their original positions; play resumes. The scorekeeper referees.",
    },
  ],

  endOfRound:
    "The hand ends the instant a player empties their Blitz Pile and shouts 'Blitz!'. Everyone stops playing at once.",

  winCondition:
    "Play repeated hands until a player reaches 75 points; the first to 75 wins. If more than one player passes 75 in the same hand, the highest score wins.",

  scoring: [
    "+1 point for each of your cards played onto the centre Dutch Piles.",
    "-2 points for each card still left in your Blitz Pile.",
    "Sort the centre Dutch Piles back to owners by card design to count them.",
    "Record scores, then deal and play another hand.",
  ],

  rulesToObserve: [
    "Pick up only one card at a time from any of your piles.",
    "You may not use both hands to play your cards.",
    "Place cards onto the Dutch Piles — throwing them is not allowed.",
    "Dutch Piles may only be started with a Number 1, built upward, same colour only.",
    "Blitz Pile: play only the top card; never shuffle it.",
    "Post Piles: build downward, alternating boy/girl; number and colour must stay visible.",
    "Wood Pile: play only the top card; don't shuffle it. If totally gridlocked, you may move the top Wood Pile card to the bottom.",
    "Turn up hand cards only in groups of three; don't shuffle your hand once play has begun; don't take threes from the bottom of your deck.",
  ],

  glossary: {
    "Blitz Pile":
      "Your 10-card key pile; emptying it ends the hand and is how you 'Blitz' the others.",
    "Post Piles":
      "Descending, boy/girl-alternating working piles to the left; act as a trading/replacement area.",
    "Wood Pile":
      "Pile to your right built from cards turned up from your hand, three at a time.",
    "Dutch Piles":
      "Shared centre piles, built ascending 1–10 by colour; where all scoring happens.",
  },
};

// ---------------------------------------------------------------------------
// Build-time validation — runs at import, throws if the record is malformed.
// ---------------------------------------------------------------------------
import { validateGameRules } from "../validate.ts";
validateGameRules(dutchBlitz);
