// high-society.ts
// Hand-authored, verified rule record for High Society, transcribed from the official rulebook.
import type { GameRules, TurnPhase } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const highSociety: GameRules = {
  id: "high-society",
  name: "High Society",
  source: "hand-authored",
  verified: true,
  players: { min: 3, max: 5 },
  estimatedMinutes: 30,
  playModel: "turn-based",

  components: [
    "16 status cards: 10 luxury cards (numbered 1–10), 3 prestige cards (each ×2), 3 disgrace cards (Passé −5, Faux Pas, Scandale ½)",
    "5 sets of 11 money cards (denominations: 1k, 2k, 3k, 4k, 6k, 8k, 10k, 12k, 15k, 20k, 25k Francs — one set per player colour)",
  ],

  objective:
    "Outbid your rivals to collect the most prestigious status cards. But don't go bankrupt — the player with the least money at the end is eliminated and cannot win.",

  setup: [
    {
      id: "money",
      instruction:
        "Give each player a set of 11 money cards of the same colour. Players keep these in hand, hidden from opponents.",
    },
    {
      id: "status-deck",
      instruction:
        "Shuffle all 16 status cards and place them as a face-down deck in the middle of the table.",
    },
    {
      id: "first-player",
      instruction:
        "The player who shuffled the status deck starts the game.",
    },
  ],

  turnStructure: {
    summary:
      "Each round, a status card is auctioned. Players take turns in clockwise order either bidding (playing money cards face-up) or passing (taking their money back). The last player still in wins the auction. Disgrace cards reverse the dynamic — you are bidding to avoid taking the card, and the round ends as soon as anyone passes.",
    phases: [
      {
        id: "reveal",
        instruction:
          "The starting player flips the top card of the status deck face-up. This is the card up for auction.",
      },
      {
        id: "bid-or-pass",
        instruction:
          "Starting with the starting player and going clockwise, each active player must either bid or pass.",
        options: [
          "Bid: play one or more money cards face-up in front of you and announce your new total. Your new total must exceed the current highest bid. You cannot pick up money cards you've already played.",
          "Pass: take all your face-up money cards back into your hand. You are out of this auction.",
        ],
        detail:
          "For disgrace cards the mechanic is reversed: you are bidding to avoid taking the card. The round ends as soon as any one player passes — that player takes the disgrace card (and keeps their money), while all other players lose the money they had on the table.",
      },
      {
        id: "resolve",
        instruction:
          "The last remaining player wins the auction. Place the status card face-up in front of the winner. Discard all money cards on the table face-down. The winner becomes starting player for the next round.",
        detail:
          "If everyone passes without bidding, the last remaining player gets the card for free.",
      },
    ] satisfies TurnPhase[],
  },

  endOfRound:
    "The game ends immediately when the fourth dark-green-backed card (any of the 3 prestige cards or the Scandale disgrace card) is revealed. No auction is held for the fourth green card.",

  winCondition:
    "First eliminate the player (or players) with the least remaining money — they are 'cast out' and cannot win. Among the remaining players, the one with the highest status score wins. Tiebreaker: most money remaining; still tied: single most-valuable luxury card.",

  scoring: [
    "Each luxury card (numbered 1–10) adds its face value to your status.",
    "The Passé disgrace card subtracts 5 from your status.",
    "The Scandale disgrace card halves your final status (applied last).",
    "Each prestige card (×2) doubles your current status. Two prestige cards = ×4; all three = ×8.",
    "Scoring order: sum luxury cards → apply Passé (−5) → apply prestige doublings → apply Scandale (÷2).",
    "The Faux Pas card forces you to immediately discard one of your luxury cards (or the next one you receive if you have none); once a luxury card is discarded, discard Faux Pas too. It has no direct numerical effect.",
    "Players reveal their hands to determine who has the least money; that player (or those players) is eliminated before scoring.",
  ],

  rulesToObserve: [
    "Status cards you have won are always visible face-up in front of you.",
    "Money cards you have spent are always hidden face-down — opponents can never count your discards.",
    "You cannot pick up money cards you have already played in the current auction.",
    "When bidding, your new total must strictly exceed the current highest bid.",
    "For disgrace auctions, everyone else loses their played money the moment one player passes.",
    "The fourth green-backed card triggers the end of the game with no auction.",
  ],

  commonMistakes: [
    "Forgetting that passing in a disgrace auction means you take the card — you want to keep bidding to avoid it.",
    "Spending so much that you end up with the least money and get eliminated even if you have the highest status.",
  ],

  glossary: {
    "Luxury card":
      "A status card numbered 1–10 that adds its value to your status score.",
    "Prestige card":
      "A status card (×2) that doubles your status; having multiples stacks multiplicatively.",
    "Disgrace card":
      "A negative status card. Passé (−5), Faux Pas (lose a luxury card), Scandale (halve your status).",
    "Cast out":
      "Eliminated from winning. The player(s) with the least remaining money at game end are cast out before the winner is determined.",
  },
};

validateGameRules(highSociety);
