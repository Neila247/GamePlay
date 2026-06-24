// paris.ts
// Hand-authored, verified rule record for Paris: La Cité de la Lumière,
// transcribed from the official Devir rulebook (English edition).
// Author: José Antonio Abascal. Illustrator: Oriol Hernández.

import type { GameRules } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const paris: GameRules = {
  id: "paris",
  name: "Paris: La Cité de la Lumière",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 2 },
  estimatedMinutes: 30,
  playModel: "turn-based",

  components: [
    "1 Game board (incorporated into the box lid)",
    "16 Cobblestone tiles (8 per player, orange and blue)",
    "12 Building pieces (2 size-3, 4 size-4, 4 size-5, 2 size-6) shared pool",
    "14 Chimneys (7 per player) — placed on buildings to show ownership",
    "8 Action tokens (4 per player)",
    "12 Action postcards (choose 8 per game)",
    "9 Special pieces: Painter pawn, Dancer pawn, Fountain tile, Statue tile, Streetlight tile, Large Streetlight tile, Botanical Garden tile, Annex piece, Mixed-color Cobblestone space tile",
  ],

  objective:
    "Score the most victory points by placing buildings on the cobblestone grid you both lay down, then lighting them up with streetlights. Buildings score size × number of streetlights shining on them — the more light, the better.",

  piles: [
    {
      name: "Cobblestone Tiles",
      count: "8 per player (16 total)",
      location: "Face down in each player's personal draw pile; one held in hand at all times",
      purpose:
        "Build the 4×4 board grid in Phase 1. Each tile has four spaces that can be your color, your opponent's color, mixed-color, or Streetlight spaces. You place tiles to create favorable territory for your buildings.",
    },
    {
      name: "Building Reserve",
      location: "In front of each player",
      purpose:
        "Buildings claimed from the common pool in Phase 1 that a player will place on the board in Phase 2. Unplaced buildings at game end cost -3 points each.",
    },
    {
      name: "Common Building Pool",
      location: "To the side, within reach of both players",
      purpose:
        "The shared supply of building pieces. During Phase 1, instead of placing a tile, a player may take one building from here into their reserve.",
    },
  ],

  setup: [
    {
      id: "action-postcards",
      instruction: "Choose 8 Action postcards and place them face up around the board.",
      detail: "For first games, use the 8 marked with a star (★). Place each special piece next to its corresponding postcard.",
    },
    {
      id: "buildings-aside",
      instruction: "Place all 12 Building pieces to the side as a shared common pool, within reach of both players.",
    },
    {
      id: "player-pieces",
      instruction: "Each player chooses a color (orange or blue) and takes their 8 Cobblestone tiles, 7 chimneys, and 4 Action tokens.",
    },
    {
      id: "shuffle-tiles",
      instruction: "Each player shuffles their 8 Cobblestone tiles face down and places them in a personal draw pile.",
    },
    {
      id: "draw-first-tile",
      instruction: "Draw the top tile from your pile and hold it in your hand, keeping it hidden from your opponent.",
    },
    {
      id: "first-player",
      instruction: "The player who lost the last game of PARIS goes first. If it is the first game of the day, the last player who switched on the lights in any room goes first.",
    },
  ],

  turnStructure: {
    summary:
      "The game is played in two sequential phases. In Phase 1 players alternate turns placing Cobblestone tiles or claiming buildings. In Phase 2 players alternate turns placing buildings or activating Action postcards. Scoring happens once after both phases are complete.",
    phases: [
      {
        id: "phase1-place-or-claim",
        instruction: "Phase 1 — On your turn, choose ONE of two options: (A) Place your held Cobblestone tile face up on any empty square of the 4×4 board, choosing its orientation, then draw your next tile; OR (B) Take one Building piece from the common pool into your personal reserve.",
        detail:
          "There are 16 board squares (4×4). Each tile fills exactly one square. Phase 1 ends when all 16 tiles have been placed. The first player to place all 8 of their tiles may then pass or continue taking buildings until their opponent also finishes placing.",
        options: [
          "Place your Cobblestone tile on an empty board square (choose orientation), then draw the next tile from your pile",
          "Take one Building piece from the common pool into your reserve",
        ],
      },
      {
        id: "phase2-build-or-act",
        instruction: "Phase 2 — The player who placed their last Cobblestone tile first in Phase 1 takes the first turn here. On your turn, choose ONE of two options: (A) Place one building from your reserve onto the board, covering only free spaces of your color or free mixed-color spaces — never Streetlight spaces — then place one of your chimneys on top of it to mark ownership; OR (B) Activate an Action postcard: use the action it shows, flip it face down, and place one of your Action tokens on it. That postcard cannot be used again.",
        detail:
          "Mixed-color spaces may be occupied by either player. Buildings may not be placed on Streetlight spaces. You may activate an Action postcard without using its effect (to deny it to your opponent). Phase 2 ends when neither player can place any more buildings AND all 8 Action tokens have been used.",
        options: [
          "Place a building from your reserve on free spaces of your color or mixed-color spaces, cap it with a chimney",
          "Activate an Action postcard (use its effect, flip it, place your token on it — once per game per card)",
        ],
      },
    ],
  },

  endOfRound:
    "Phase 2 ends when neither player can place any more buildings and all 8 Action tokens have been played. Scoring then takes place once.",

  winCondition:
    "The player with the most victory points after scoring wins. On a tie, the player with the most visible free spaces of their own color remaining on the Cobblestone tiles wins.",

  scoring: [
    "+ILLUMINATED BUILDINGS: For each of your buildings, multiply its size (number of spaces it covers) by the number of streetlights that shine on it. A streetlight illuminates the four orthogonally adjacent spaces (not diagonals). A streetlight counts only once per building even if it is adjacent to multiple spaces of that building. A building with zero streetlights scores zero.",
    "+LARGEST BUILDING GROUP: Identify the largest single group of your connected buildings (orthogonal contact only, not diagonal). Score 1 point per space in that group (sum of all building sizes in the group). Illumination does not matter for this bonus.",
    "-UNBUILT BUILDINGS: Lose 3 points for every building piece you reserved in Phase 1 but did not place on the board during Phase 2.",
    "+ACTION POSTCARDS: Some postcards (marked with a victory-point stamp) award additional points at game end. Check each postcard you activated.",
  ],

  rulesToObserve: [
    "A Cobblestone tile must fully occupy exactly one board square — it cannot straddle two squares.",
    "Buildings can only be placed on free spaces of your own color or free mixed-color spaces.",
    "Buildings may never be placed on Streetlight spaces (unless you have activated the Metropolitain postcard).",
    "Place one chimney on every building you place to identify ownership.",
    "Each Action postcard can only be used once per game (flip it and mark it with your token).",
    "You may activate an Action postcard without using its effect — the card is still spent.",
    "When determining illumination, count each streetlight only once per building, even if it is adjacent to several spaces of that building.",
    "Buildings form a group only through orthogonal (side-to-side) contact — diagonal touching does not count.",
  ],

  commonMistakes: [
    "Placing a building on a Streetlight space — this is only allowed via the Metropolitain postcard.",
    "Counting a streetlight more than once for the same building when it touches multiple spaces of that building.",
    "Counting diagonal contact as a connection between buildings for the largest-group bonus.",
    "Forgetting the -3 penalty for each building left unplaced in your reserve at game end.",
    "Using both options on a single turn — you may only place a tile OR take a building in Phase 1, and only place a building OR activate a postcard in Phase 2.",
  ],

  glossary: {
    "Cobblestone Tile":
      "One of 16 square tiles that together form the 4×4 board. Each tile has four spaces which may be colored for one player, the other, mixed, or marked as a Streetlight space.",
    "Free space":
      "Any space on a Cobblestone tile that does not have a game piece on it. Streetlight spaces are always considered free.",
    "Mixed-color space":
      "A Cobblestone space that either player may build on.",
    "Streetlight space":
      "A special space printed on certain Cobblestone tiles. Buildings may not be placed here (exception: Metropolitain postcard). Streetlights placed here illuminate adjacent spaces.",
    "Building piece":
      "A shaped piece taken from the common pool. Sizes range from 3 to 6 spaces. Capped with a chimney to show ownership when placed.",
    "Chimney":
      "Placed on top of a building to show which player owns it. Each player has 7.",
    "Action token":
      "Placed face-down on a used Action postcard to show it cannot be used again. Each player has 4, so 8 total postcards will be used in a game.",
    "Action postcard":
      "One of 12 special cards placed around the board. Activating one gives a one-time effect or end-game bonus and removes it from play.",
    "Reserve":
      "The buildings a player has claimed from the common pool but not yet placed on the board.",
    "Building group":
      "A set of a player's buildings connected by orthogonal (side-to-side) contact. Used to determine the largest-group scoring bonus.",
    "Annex":
      "A special size-1 piece (from the Bouquinistes sur la Seine postcard) placed adjacent to one of your buildings, increasing that building's size by 1.",
  },
};

// ---------------------------------------------------------------------------
// Build-time validation — runs at import, throws if the record is malformed.
// ---------------------------------------------------------------------------
validateGameRules(paris);
