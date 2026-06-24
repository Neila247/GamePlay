// cabo.ts
// Hand-authored, verified rule record for Cabo (Kaboo), transcribed from the official rulebook.
import type { GameRules } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const cabo: GameRules = {
  id: "cabo",
  name: "Cabo",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 6 },
  playModel: "turn-based",

  components: [
    "Standard 52-card deck",
    "2 Jokers (included in play)",
  ],

  objective:
    "Have the lowest total card value in front of you when someone calls 'Cabo' and the round ends. Reduce your score by swapping high cards for low ones or eliminating cards by pairing matching ranks.",

  setup: [
    {
      id: "deal",
      instruction: "Deal 4 cards face down to each player. Both Jokers are included in the deck.",
    },
    {
      id: "arrange",
      instruction: "Each player arranges their 4 cards into a 2×2 square formation face down in front of them.",
    },
    {
      id: "stockpile",
      instruction: "Place the remaining cards face down in the centre as the stockpile. Flip the top card face up beside it to start the discard pile.",
    },
    {
      id: "peek",
      instruction: "Each player secretly looks at only their two nearest cards, memorises their rank, then replaces them face down.",
      detail: "After this peek, no player may look at their own cards again unless a special card ability allows it.",
    },
  ],

  turnStructure: {
    summary:
      "Starting with the player to the dealer's left and going clockwise, each player chooses one of three actions on their turn.",
    phases: [
      {
        id: "action",
        instruction: "On your turn choose exactly one of these three actions:",
        options: [
          "Draw from the stockpile: keep the drawn card (swap it face down for one of your own, placing that card on the discard pile) or discard it immediately.",
          "Take the top card of the discard pile and swap it for one of your own cards, placing that card on the discard pile.",
          "Call 'Cabo' — this ends the round after every other player takes one more turn.",
        ],
      },
      {
        id: "special-ability",
        instruction: "If the card you discard (either by drawing and discarding or by swapping) is a special card, you may use its ability before the next player's turn.",
        detail:
          "Special cards and abilities — Black King: 'Look & Swap' (look at one of another player's cards, then choose whether to swap it with one of your own); Queen or Jack: 'Blind Swap' (swap one of your cards with another player's card without looking at either); 9 or 10: 'Look at another's' (look at one of another player's cards); 7 or 8: 'Look at own' (look at one of your own cards). Using the ability is optional.",
      },
      {
        id: "snap",
        instruction:
          "At any point when a card is discarded, any player (including out-of-turn players) may immediately 'snap' by placing a card of matching rank from their own formation on top of the discard pile.",
        detail:
          "Only the first card played in a snap attempt stands. If correct, the snapping player permanently removes that card from their formation (one fewer card for the rest of the game). If snapping one of an opponent's cards, the successful snapper may move one of their own cards into the gap in the opponent's formation. If incorrect (wrong rank remembered), the player returns the card to its original position and takes two extra face-down cards added to their formation.",
      },
    ],
  },

  endOfRound:
    "When a player calls 'Cabo', each other player takes one final turn. Then all cards are revealed face up and scores are totalled.",

  winCondition:
    "The player with the lowest score when 'Cabo' is called wins the round. Play multiple rounds as desired; the player with the lowest cumulative score wins.",

  scoring: [
    "Number cards 2–10 = face value.",
    "Jack = 11.",
    "Queen = 12.",
    "Black Kings = 13.",
    "Red Kings = 0.",
    "Jokers = -1.",
  ],

  rulesToObserve: [
    "After the opening peek, you may not look at your own cards unless a special card ability allows it.",
    "Cards in front of players must remain hidden from all other players.",
    "Special card abilities are optional — using them is a choice, not a requirement.",
    "In a snap race, only the first card placed on the discard pile stands; all subsequent snap attempts are ignored.",
  ],

  commonMistakes: [
    "Peeking at your own cards without a '7/8' ability — those cards must stay face down.",
    "Forgetting that calling 'Cabo' gives every other player one more turn before the reveal.",
    "Attempting to use a special ability when you took from the discard pile rather than the stockpile — the ability only triggers when you discard a card.",
  ],

  glossary: {
    Cabo: "The call that ends the round; all other players get one final turn before cards are revealed.",
    Stockpile: "The face-down draw pile in the centre.",
    "Discard pile": "The face-up pile beside the stockpile; the top card is always available to take.",
    Snapping: "Immediately placing a matching-rank card onto the discard pile out of turn to remove it from your formation.",
  },
};

validateGameRules(cabo);
