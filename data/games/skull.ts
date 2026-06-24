// skull.ts
// Hand-authored, verified rule record for Skull & Roses, transcribed from the official rulebook.
import type { GameRules } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const skull: GameRules = {
  id: "skull",
  name: "Skull & Roses",
  source: "hand-authored",
  verified: true,
  players: { min: 3, max: 6 },
  playModel: "turn-based",

  components: [
    "6 packs of 4 cards each (3 Roses cards + 1 Skull card per pack), with identical backs per pack",
    "6 double-sided game mats (Skull-side and Roses-side)",
    "One rulebook",
  ],

  objective:
    "Be the first player to win two bets. A bet is won by being the highest bidder and then successfully flipping the exact number of cards you claimed — revealing only Roses, never a Skull.",

  setup: [
    {
      id: "mats",
      instruction: "Each player takes a game mat and places it in front of them, Skull-side up.",
    },
    {
      id: "cards",
      instruction: "Each player takes the pack of 4 cards with the same back as their mat (3 Roses + 1 Skull) and holds them in hand, keeping the card faces hidden from all other players.",
    },
    {
      id: "first-player",
      instruction: "Choose a first player by any agreed method.",
    },
  ],

  turnStructure: {
    summary:
      "Each round has two sequential phases: a card-placement phase where players build face-down stacks, followed by a challenge phase where players bid on how many cards they can flip without hitting a Skull.",
    phases: [
      {
        id: "phase-1-placement",
        instruction: "Start of the hand: each player secretly looks at their cards, chooses one, and places it face down on their mat.",
        detail:
          "After all players have placed their first card, the first player may either play a second card face down on top of their first, or skip to a challenge instead. Play continues clockwise — each player either adds one more card face down to their own stack or issues a challenge. This continues until someone issues a challenge. A player who has no cards left in hand MUST issue a challenge.",
      },
      {
        id: "phase-2-challenge",
        instruction: "The player who issues the challenge announces the number of cards they intend to flip face up from among all cards placed on all mats.",
        detail:
          "Going clockwise from the challenger, each other player must either raise the bid (announce a higher number) or pass by pushing their mat to the middle of the table. A player who passes cannot bid again. This continues until all players have passed except one — that player is the challenger (highest bidder).",
      },
      {
        id: "phase-3-revelation",
        instruction: "The challenger must flip the number of cards they bid, following these rules: start by revealing all cards on your own mat (from the top down), then freely choose which other players' mats to flip from, one card at a time from the top.",
        detail:
          "The challenger is never forced to reveal all cards on other players' mats — only enough to reach their bid total. Cards on each mat are revealed in order from top to bottom. The challenger stops flipping as soon as they either reach their bid (win) or reveal a Skull (lose).",
      },
      {
        id: "phase-4-outcome",
        instruction: "Resolve the outcome: win or lose.",
        detail:
          "Win: the challenger flipped the exact number of cards bid and revealed only Roses. The challenger flips their game mat to the Roses-side up. As soon as a player wins a second bet, that player wins the game. Lose: the challenger revealed a Skull and stops immediately. All players take their cards back into hand. The challenger loses one card for good — the card is chosen at random by the opponent whose Skull was revealed (or by the challenger themselves if it was their own Skull). The challenger discards that card without looking at it. If the challenger loses their last card they are eliminated. Whether the bet is won or lost, the challenger is the first player for the next round, which restarts at phase 1.",
      },
    ],
  },

  winCondition:
    "The first player to win two bets (flip their game mat to Roses-side twice) wins the game.",

  rulesToObserve: [
    "Never reveal the hidden face of your cards during the placement phase.",
    "Cards are placed on the game mat in a stack — the number of cards placed must always be obvious at a glance.",
    "Only one card is played at a time during placement.",
    "A player who no longer has any cards in hand must issue a challenge immediately when their turn comes.",
    "A player who passes during the challenge phase cannot bid again that round.",
    "The challenger must always start the revelation by flipping their own cards first.",
    "The challenger must never reveal remaining cards on other players' mats beyond what is needed — other players' strategies must stay secret.",
    "If a player accidentally reveals one card on their mat, that card remains visible until the end of the round.",
  ],

  commonMistakes: [
    "Forgetting to start the revelation with your own mat — you must flip all your own cards before touching anyone else's.",
    "Bidding a number lower than the total cards you personally placed (you must flip your own stack first, so you cannot avoid your own Skull).",
    "Passing players pushing their mat in before it is their turn to speak.",
  ],

  glossary: {
    "Burn out": "A bet that consists of revealing all cards at the table.",
    "Under the gun": "The second player to speak when a challenge is issued.",
    "The cop": "The last player to speak before the highest bidder.",
    Stoned: "A player with only one remaining card.",
    Challenge: "The bid phase; the player who initiates it announces a number of cards they intend to flip.",
    Challenger: "The highest bidder who must attempt the revelation.",
  },
};

validateGameRules(skull);
