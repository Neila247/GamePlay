// sushi-go.ts
// Hand-authored, verified rule record for Sushi Go!, transcribed from the official Gamewright rulebook (©2014).
import type { GameRules, TurnPhase } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const sushiGo: GameRules = {
  id: "sushi-go",
  name: "Sushi Go!",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 5 },
  ageRecommendation: 8,
  estimatedMinutes: 15,
  playModel: "turn-based",

  components: [
    "108 cards total",
    "14x Tempura",
    "14x Sashimi",
    "14x Dumpling",
    "12x Maki Roll (2 icons)",
    "8x Maki Roll (3 icons)",
    "6x Maki Roll (1 icon)",
    "10x Salmon Nigiri",
    "5x Squid Nigiri",
    "5x Egg Nigiri",
    "10x Pudding",
    "6x Wasabi",
    "4x Chopsticks",
  ],

  objective:
    "Score the most points over 3 rounds by drafting sushi cards — picking one card from your hand each turn, then passing the rest to the next player. Build the best combination of dishes.",

  setup: [
    {
      id: "shuffle",
      instruction: "Shuffle all 108 cards well.",
    },
    {
      id: "deal",
      instruction:
        "Deal cards to each player based on player count: 10 cards each for 2 players, 9 for 3 players, 8 for 4 players, 7 for 5 players.",
      detail: "Hold your cards in your hand, secret from opponents.",
    },
    {
      id: "draw-pile",
      instruction: "Place the remaining cards face-down in the centre as a draw pile.",
    },
    {
      id: "scorekeeper",
      instruction: "Grab a piece of paper and pencil; designate one player as scorekeeper.",
    },
  ],

  turnStructure: {
    summary:
      "The game is played over 3 rounds. Each round, players simultaneously pick 1 card from their hand, reveal it, then pass their remaining hand to the left. Repeat until all cards have been played, then score the round.",
    phases: [
      {
        id: "choose",
        instruction:
          "Simultaneously, each player chooses 1 card from their hand and places it face-down in front of them.",
      } as TurnPhase,
      {
        id: "reveal",
        instruction:
          "All players reveal their chosen cards at the same time and place them face-up in front of themselves.",
        detail:
          "If you played a Nigiri card and you already have a Wasabi in front of you, place the Nigiri on top of the Wasabi — it has tripled in value. If you play Chopsticks and later want to use them, call \"Sushi Go!\" before everyone reveals on a future turn, take a second card from your hand, then return the Chopsticks card into your hand to pass on.",
      } as TurnPhase,
      {
        id: "pass",
        instruction:
          "Pass your remaining hand face-down to the player on your left. Pick up the new hand you receive.",
      } as TurnPhase,
      {
        id: "end-of-round",
        instruction:
          "When the final remaining card of each hand is passed on, place it face-up with your collected cards. Score all face-up cards except Puddings (see Scoring). Pudding cards are kept in front of you to be scored at game end.",
        detail:
          "After scoring, discard all cards face-up beside the draw pile except Puddings. Deal each player a new hand from the draw pile equal in size to the previous round's hand.",
      } as TurnPhase,
    ],
  },

  endOfRound:
    "A round ends when all cards have been played from the dealt hands. Score all collected cards except Puddings. Discard played cards and deal new hands for the next round.",

  winCondition:
    "After 3 rounds, the player with the most total points wins. In case of a tie, whoever has the most Pudding cards wins.",

  scoring: [
    "MAKI ROLLS: Count maki roll icons across all your maki cards. Most icons: 6 points. Second most: 3 points. Ties split points evenly (ignoring remainder). If tied for most, no second-place points are awarded.",
    "TEMPURA: Each set of 2 Tempura cards scores 5 points. A single Tempura scores nothing.",
    "SASHIMI: Each set of 3 Sashimi cards scores 10 points. Fewer than 3 scores nothing.",
    "DUMPLINGS: 1 dumpling = 1 pt, 2 = 3 pts, 3 = 6 pts, 4 = 10 pts, 5 or more = 15 pts.",
    "NIGIRI: Squid Nigiri = 3 pts, Salmon Nigiri = 2 pts, Egg Nigiri = 1 pt. Each is tripled in value if placed on a Wasabi card.",
    "WASABI: Worth nothing on its own; triples the value of the next Nigiri placed on it.",
    "CHOPSTICKS: Worth nothing.",
    "PUDDINGS (scored at game end after round 3): Most Pudding cards = 6 points. Fewest (including zero) = lose 6 points. Ties split points evenly. In a 2-player game, no one loses points for Puddings — only the most is awarded.",
  ],

  rulesToObserve: [
    "All players choose and reveal cards simultaneously.",
    "A Nigiri card must be placed on top of an existing Wasabi in front of you if one is available. Only 1 Nigiri per Wasabi.",
    "You may have multiple Wasabi cards in front of you but only 1 Nigiri goes on each.",
    "You may have multiple Chopsticks cards but may only use 1 per turn.",
    "To use Chopsticks: call \"Sushi Go!\" before others reveal, take a second card from your hand, then return the Chopsticks card into your hand to be passed on.",
    "Pudding cards are never discarded at end of round — keep them until the end of the game.",
    "After round 3, remaining cards in the draw pile are ignored.",
  ],

  commonMistakes: [
    "Forgetting to place a Nigiri on top of an existing Wasabi — this is required, not optional.",
    "Discarding Pudding cards at the end of a round instead of keeping them.",
    "Scoring Maki Rolls by card count instead of icon count.",
    "Forgetting that ties for most Maki Rolls cancel the second-place award.",
  ],

  glossary: {
    Drafting:
      "The core mechanic: each player picks one card from their hand, then passes the rest. You see fewer and fewer options as the round progresses.",
    "Maki Roll":
      "Cards showing 1, 2, or 3 maki roll icons. At round end, add up all your icons and compete for 6/3 points.",
    Wasabi:
      "A modifier card that triples the value of the next Nigiri card placed on it.",
    Chopsticks:
      "Lets you grab 2 cards on a future turn by calling \"Sushi Go!\"; the card then passes on.",
    Pudding:
      "Kept across all 3 rounds; scored only at game end for most (6 pts) and fewest (-6 pts).",
  },
};

validateGameRules(sushiGo);
