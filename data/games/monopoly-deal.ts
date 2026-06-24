// monopoly-deal.ts
// Hand-authored, verified rule record for Monopoly Deal, transcribed from the official rulebook.
import type { GameRules } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const monopolyDeal: GameRules = {
  id: "monopoly-deal",
  name: "Monopoly Deal",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 5 },
  estimatedMinutes: 20,
  ageRecommendation: 8,
  playModel: "turn-based",

  components: [
    "110 playing cards total",
    "28 Property cards (in colour-coded sets)",
    "11 Property Wild cards (2 rainbow multi-colour wilds; others show 2 specific colours)",
    "34 Action cards (It's My Birthday, Deal Breaker, Debt Collector, Just Say No, Sly Deal, Forced Deal, House, Hotel, Pass Go, Double the Rent)",
    "13 Rent cards (colour-paired and multi-colour)",
    "20 Money cards",
    "4 Quick Start Rules cards",
  ],

  objective:
    "Be the first player to collect 3 complete property sets of 3 different colours in front of you.",

  setup: [
    {
      id: "remove-rules-cards",
      instruction:
        "Remove the 4 Quick Start Rules cards from the pack and hand them out to players for reference.",
    },
    {
      id: "shuffle-and-deal",
      instruction:
        "Shuffle the remaining 106 cards together and deal 5 cards to each player, face down.",
      detail: "All players look at their own cards but keep them secret from others.",
    },
    {
      id: "draw-pile",
      instruction:
        "Place the remaining cards face down in the centre of the table to form the draw pile.",
    },
    {
      id: "first-player",
      instruction: "Decide who goes first. Play continues clockwise.",
    },
  ],

  turnStructure: {
    summary:
      "On your turn: draw 2 cards, then play up to 3 cards in any combination — adding money/action cards to your Bank, laying property cards in your collection, or playing action cards into the centre. End your turn with no more than 7 cards in hand.",
    phases: [
      {
        id: "draw",
        instruction:
          "Take 2 cards from the draw pile and add them to your hand.",
        detail:
          "If you have no cards left at the start of your turn, pick up 5 instead of 2.",
      },
      {
        id: "play-cards",
        instruction:
          "Play up to 3 cards from your hand onto the table in any order and any combination of the three actions below. You do not have to play any cards if you do not want to.",
        options: [
          "Bank: Place a Money card or Action card face up onto your own Bank pile. An Action card banked this way loses its action for the rest of the game; if you later pay it to another player it goes into their Bank, not back into play.",
          "Property: Lay a Property card or Property Wild card face up into your property collection in front of you. You may only reorganise your property collection on your own turn.",
          "Action: Play an Action card face up into the centre of the table and follow its instructions immediately.",
        ],
      },
      {
        id: "end-turn",
        instruction:
          "If you have more than 7 cards in hand at the end of your turn (not counting cards on the table), discard extras to the bottom of the draw pile until you have exactly 7.",
        detail: "If you have run out of cards, take 5 at the start of your next turn.",
      },
    ],
  },

  winCondition:
    "The first player to have 3 complete property sets of 3 different colours laid out in their property collection wins. If you realise you have won during another player's turn, you must wait until your own turn to declare it.",

  scoring: [
    "No ongoing score is tracked. The win condition is completing 3 different-coloured full property sets.",
  ],

  rulesToObserve: [
    "You may never pay with cards from your hand — only with cards already in front of you (Bank or property collection).",
    "Cards can never go back into a player's hand once played onto the table.",
    "Change is not given: if you owe 2M and only have a 3M card, you pay the 3M and receive no change.",
    "If you have no cards in front of you, you do not pay at all.",
    "If you pay with Property cards, they go into the receiving player's property collection (not their Bank).",
    "A Property Wild card used in a set may be swapped between sets on your own turn only.",
    "The 2 rainbow multi-colour Property Wild cards have no monetary value and cannot be used to pay.",
    "You can only have one House and one Hotel on any property set. A Hotel requires a House to already be on that set. Houses and Hotels cannot be added to Stations or Utilities sets.",
    "Just Say No cancels any Action card played against you. It may itself be countered by another Just Say No.",
    "Double the Rent must be played together with a standard Rent card on the same turn and counts as 2 of your 3 plays.",
    "You may play more than one Pass Go card per turn.",
    "Sly Deal and Forced Deal cannot target a card that is part of a complete (full) set.",
    "Deal Breaker steals an entire complete set, including any House or Hotel on it.",
  ],

  commonMistakes: [
    "Paying from your hand — payment must come only from your Bank or property collection.",
    "Expecting change when you overpay — no change is ever given.",
    "Forgetting that an Action card placed in your Bank can no longer be used as an action.",
    "Trying to add a Hotel without a House already on that set.",
    "Using Sly Deal or Forced Deal on a card from a complete set — this is not allowed.",
    "Declaring a win on someone else's turn — you must wait for your own turn.",
  ],

  glossary: {
    Bank: "Your personal pile of Money and/or Action cards used to pay other players.",
    "Property collection":
      "The face-up property cards laid out in front of you, grouped by colour set.",
    "Full set":
      "The complete number of properties of a single colour as shown on each property card.",
    "Property Wild card":
      "A card that can stand in for a property of one of its indicated colours. Multi-colour wilds work for any colour but have no monetary value.",
    "Just Say No":
      "Action card played at any time to cancel an Action card played against you.",
    "Deal Breaker": "Steal a complete property set (including buildings) from any player.",
    "Debt Collector": "Force one player to pay you 5M.",
    "It's My Birthday": "All other players each pay you 2M.",
    "Sly Deal":
      "Steal a single property from any player, but not from a complete set.",
    "Forced Deal":
      "Swap one of your properties with a property from another player, but not from a complete set.",
    "Double the Rent":
      "Played alongside a Rent card to double the rent charged. Counts as 2 of your 3 plays.",
    House: "Add to a full property set to increase its rent value by 3M.",
    Hotel: "Add to a full property set (that already has a House) to increase its rent value by 4M.",
    "Pass Go": "Draw 2 extra cards from the draw pile immediately.",
    "Trade Route": "Not used in Monopoly Deal.",
  },
};

// ---------------------------------------------------------------------------
// Build-time validation — runs at import, throws if the record is malformed.
// ---------------------------------------------------------------------------
validateGameRules(monopolyDeal);
