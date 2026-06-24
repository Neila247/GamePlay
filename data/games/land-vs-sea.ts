// land-vs-sea.ts
// Hand-authored, verified rule record for Land vs Sea, transcribed from the official rulebook.
import type { GameRules } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const landVsSea: GameRules = {
  id: "land-vs-sea",
  name: "Land vs Sea",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 4 },
  playModel: "turn-based",

  components: [
    "1 starting map tile",
    "1 double-sided Volcano/Whirlpool tile",
    "58 double-sided hex map tiles",
    "2 double-sided player aids for scoring options",
    "1 scoreboard (printed on the box insert)",
    "7 wooden discs: 3 Land (orange), 3 Sea (blue), 1 Cartographer (green/compass)",
  ],

  objective:
    "Players take sides — Land or Sea. Land tries to complete land areas; Sea tries to complete sea areas. Completed areas score 1 point per contributing tile for their respective side. Score bonus points for completing an area. The player or team with the most points when the last tile is placed wins.",

  setup: [
    {
      id: "choose-teams",
      instruction:
        "Use the scoring discs to randomly determine who plays Land and who plays Sea. In a 4-player game, form 2 Land vs 2 Sea teams. In a 3-player game, assign Land, Sea, and Cartographer roles.",
    },
    {
      id: "scoreboard",
      instruction:
        "Place the box bottom within reach of all players as the scoreboard. Angle it so all players can see the icon key. Place a Land and a Sea scoring disc at the start of the scoreboard.",
    },
    {
      id: "starting-tile",
      instruction: "Find the starting tile and place it in the middle of the play area.",
    },
    {
      id: "volcano-tile",
      instruction:
        "Find the double-sided Volcano/Whirlpool tile and place it within reach of all players.",
    },
    {
      id: "tile-stacks",
      instruction:
        "Shuffle and divide the remaining tiles into 2 even stacks. Place these stacks near the scoreboard.",
    },
    {
      id: "draft-starting-tiles",
      instruction:
        "Starting with Land, players take turns choosing and taking a tile from the top of either stack until each player has 2 tiles in front of them, placed face up.",
      detail:
        "You may only look at the hidden side of a tile after you have taken it, but do not reveal it to other players.",
    },
  ],

  turnStructure: {
    summary:
      "Land goes first (youngest Land member in team games). Players alternate clockwise. Each turn: play a tile, use any Action Tiles, score completed areas, optionally place a Waypoint, then draw back up to 2 tiles.",
    phases: [
      {
        id: "play-tile",
        instruction:
          "Look at both sides of your tiles (without revealing them). Choose one side of either tile and place it face up onto the map, adjacent to at least one existing tile, so that every connected edge matches — land edges to land edges, sea edges to sea edges.",
        detail:
          "You may not place a tile such that any of its edges fail to match the type of adjacent tile edges.",
      },
      {
        id: "action-tiles",
        instruction:
          "If the tile you just placed has a Play Again or Steal icon, you may use that action now.",
        options: [
          "Play Again: Immediately play your second tile anywhere on the map in the usual way, if you still have one.",
          "Steal: Take 1 tile from any other player — but not their last tile. You may not look at its hidden side until after you take it, and you may not play it this turn. Do not draw a replacement tile at the end of this turn, as you already have 2 tiles.",
        ],
      },
      {
        id: "score-areas",
        instruction:
          "If the tile(s) you placed complete any land or sea areas, score them now.",
        detail:
          "A completed area has no open edges of its type. Land scores 1 point per tile contributing to a completed land area; Sea scores 1 point per tile contributing to a completed sea area. Whoever completes the area also scores 1 bonus point per bonus-point icon (cross/dagger) inside that completed area.",
      },
      {
        id: "place-waypoint",
        instruction:
          "(Optional, recommended in 3 and 4 player games) If your Waypoint is not already on the map, you may place it onto any matching open land or sea area that does not already contain a Waypoint.",
        detail:
          "A Waypoint is returned to its owner (scoring them a bonus point) when the area containing it is completed, or when the tile it sits on is surrounded by 6 tiles.",
      },
      {
        id: "draw-tiles",
        instruction:
          "Take a tile from the top of either stack to bring your tile count back up to 2. Place both tiles face up in front of you without flipping them.",
        detail:
          "If only 1 stack remains, split it into 2 equal halves. You may look at a tile's hidden side after taking it, before choosing your next tile from the stack.",
      },
    ],
  },

  priorities: [
    "Complete many small areas rather than a few large ones — small areas lock in points and are safer.",
    "Work on multiple areas at once so your tiles fit useful places more often.",
    "Score bonus (cross) points yourself by completing rivals' areas before they can.",
    "Use Play Again tiles to work around opponents' attempts to block you.",
    "Use Steal tiles to take a tile a rival needs, or to disrupt their plans.",
    "Consider finishing a rival's area to claim its bonus points rather than letting them score them.",
  ],

  specialCalls: [
    {
      name: "Volcano/Whirlpool tile",
      when:
        "A hole forms in the map — a space completely surrounded by 6 edges of the same type (e.g. all 6 surrounding edges are sea edges).",
      effect:
        "The player who placed the final tile surrounding the hole immediately takes the Volcano/Whirlpool tile and places it into the hole, oriented as they choose, on the face matching the edge type. Scoring from that tile proceeds as usual.",
    },
  ],

  endOfRound:
    "There are no rounds. Each player takes a single turn per go. The game ends when the last tile is placed onto the map.",

  winCondition:
    "The game ends after the last tile is placed. The player (or team) with the most points wins. If scores are tied, the game is a tie.",

  scoring: [
    "Land scores 1 point per tile contributing to each completed land area, no matter who placed those tiles.",
    "Sea scores 1 point per tile contributing to each completed sea area, no matter who placed those tiles.",
    "Whoever completes an area also scores 1 bonus point per cross/dagger icon inside that completed area.",
    "Waypoints: whoever returns a Waypoint to its owner (by completing or surrounding its area/tile) scores 1 bonus point.",
    "Mountain & Coral (optional): Land scores 1 point per Mountain section in a connected Mountain chain the moment a new connection is made; Sea does the same for Coral chains.",
    "Caravan & Ship (optional): Whoever places a Caravan or Ship tile adjacent to another Caravan or Ship tile immediately scores 2 points. At game end, each Trade Route (group of adjacent Caravan/Ship tiles) scores separately by majority — more Caravans gives Land 1 point per tile in the route; more Ships gives Sea 1 point per tile; a tie scores nothing.",
  ],

  rulesToObserve: [
    "Every connected edge of a placed tile must match the type (land or sea) of every adjacent tile edge — no exceptions.",
    "You may never look at the hidden side of tiles on the stack until after you have taken them.",
    "You may never show anyone else the hidden side of your own tiles.",
    "You may never steal a player's last tile.",
    "A tile stolen with the Steal action cannot be played on the same turn it is stolen.",
    "Cards in hand can never go back into the stacks.",
    "If you realise you have won during another player's turn, you must wait until your own turn to declare it.",
    "In 4-player Waypoint mode, team mates may not advise each other with words, gestures, or body language about where or how to place tiles.",
  ],

  commonMistakes: [
    "Placing a tile so that one of its edges does not match the type of an adjacent tile's edge.",
    "Trying to play the tile stolen via a Steal action on the same turn it was taken.",
    "Forgetting to score bonus cross points for whoever completes an area.",
    "Forgetting that a completed area includes every tile touching that contiguous land or sea region — count carefully in large areas.",
  ],

  glossary: {
    "Land area":
      "A contiguous region of land edges fully enclosed with no open land edges remaining.",
    "Sea area":
      "A contiguous region of sea edges fully enclosed with no open sea edges remaining.",
    "Play Again":
      "Action icon on some tiles. When placed, lets you immediately play your second tile anywhere on the map.",
    Steal:
      "Action icon on some tiles. When placed, lets you take 1 tile from any player (not their last). Cannot be played this turn.",
    Waypoint:
      "A wooden disc belonging to Land or Sea. Placed on an open area as a bonus-point marker; returned (scoring 1 point) when its area is completed or its tile is surrounded.",
    "Bonus point (cross icon)":
      "A cross/dagger icon printed inside a tile area. Whoever completes the area containing it scores 1 extra point per icon.",
    "Volcano/Whirlpool tile":
      "Special double-sided tile used to fill a hole (a space surrounded by 6 edges of the same type) that cannot otherwise be filled.",
    "Trade Route":
      "A group of adjacent tiles all containing Caravan and/or Ship icons. Scored for majority at game end.",
    Mountain:
      "A land-edge section on some tiles. When its edge connects to another Mountain edge, Land immediately scores 1 point per Mountain section in the connected chain.",
    Coral:
      "A sea-edge section on some tiles. When its edge connects to another Coral edge, Sea immediately scores 1 point per Coral section in the connected chain.",
  },
};

// ---------------------------------------------------------------------------
// Build-time validation — runs at import, throws if the record is malformed.
// ---------------------------------------------------------------------------
validateGameRules(landVsSea);
