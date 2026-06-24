// jaipur.ts
// Hand-authored, verified rule record for Jaipur, transcribed from the official rulebook.
import type { GameRules, TurnPhase } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const jaipur: GameRules = {
  id: "jaipur",
  name: "Jaipur",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 2 },
  ageRecommendation: 12,
  estimatedMinutes: 30,
  playModel: "turn-based",

  components: [
    "55 goods cards: 6 diamonds, 6 gold, 6 silver, 8 cloth, 8 spice, 10 leather, 11 camels",
    "38 goods tokens (sorted by type in descending value stacks): diamonds, gold, silver, cloth, spice, leather",
    "18 bonus tokens (3 piles shuffled separately): 3-card bonuses (1–3 rupees), 4-card bonuses (4–6 rupees), 5+-card bonuses (8–10 rupees)",
    "1 camel token (worth 5 rupees to the player with the most camels at round end)",
    "3 Seals of Excellence",
  ],

  objective:
    "Become the Maharaja's personal trader by winning 2 Seals of Excellence. Each round, earn more rupees than your opponent by collecting and selling goods at the right time.",

  setup: [
    {
      id: "camels-in-market",
      instruction:
        "Place 3 camel cards face-up between the players. These form the start of the market.",
    },
    {
      id: "shuffle-deal",
      instruction:
        "Shuffle the remaining 52 cards. Deal 5 cards to each player.",
    },
    {
      id: "deck",
      instruction:
        "Place the remaining cards face-down as the draw pile (deck).",
    },
    {
      id: "fill-market",
      instruction:
        "Draw the top 2 cards from the deck and place them face-up next to the 3 camels. The market now has 5 cards.",
      detail:
        "If any of the 2 drawn cards are camels, they join the market face-up as normal.",
    },
    {
      id: "herds",
      instruction:
        "Each player removes any camel cards from their starting hand and places them face-up in a stack in front of them. This is their herd. Camels in the herd do not count toward the 7-card hand limit.",
    },
    {
      id: "tokens",
      instruction:
        "Sort goods tokens by type in descending order of value (highest on top) and spread each pile so both players can see all values. Shuffle each bonus token type separately into 3 face-down piles. Place the camel token and the 3 Seals of Excellence where both players can reach them.",
    },
    {
      id: "starting-player",
      instruction: "Pick a starting player.",
    },
  ],

  turnStructure: {
    summary:
      "On your turn, choose exactly one action: Take Cards or Sell Cards. You may never do both.",
    phases: [
      {
        id: "take-or-sell",
        instruction:
          "Choose one action: Take Cards or Sell Cards.",
        options: [
          "TAKE CARDS: choose one sub-option — (A) Exchange, (B) Take 1 good, or (C) Take all camels.",
          "SELL CARDS: discard one or more cards of the same goods type for rupees and possibly a bonus.",
        ],
      },
      {
        id: "take-exchange",
        instruction:
          "(A) Exchange: take any goods cards from the market into your hand, then return the same number of cards from your hand (can be camels, goods, or a mix). You must exchange at least 2 cards for 2 cards. You cannot both take and return the same type of good.",
        detail:
          "You may never have more than 7 cards in hand at the end of your turn. Camels in your herd do not count toward this limit.",
      },
      {
        id: "take-single",
        instruction:
          "(B) Take 1 single good: take one goods card (not a camel) from the market into your hand, then replace it with the top card of the deck.",
      },
      {
        id: "take-camels",
        instruction:
          "(C) Take all camels: take ALL camel cards from the market and add them to your herd, then refill the market from the deck.",
      },
      {
        id: "sell",
        instruction:
          "Sell Cards: choose one goods type. Discard as many cards of that type as you like onto the discard pile. Take one goods token per card sold (highest values first from that type's stack). If you sell 3 or more cards, also take the matching bonus token.",
        detail:
          "Diamonds, gold, and silver require a minimum sale of 2 cards. You can only sell one goods type per turn. If fewer tokens remain than cards sold, you still receive the bonus token for the quantity sold.",
      },
      {
        id: "end-turn",
        instruction:
          "Your turn ends. Your opponent takes their turn.",
      },
    ] satisfies TurnPhase[],
  },

  endOfRound:
    "A round ends immediately when either: 3 types of goods tokens are fully depleted, or the draw pile runs out when a player tries to refill the market. At round end, the player with more camels in their herd takes the camel token (5 rupees). Both players total their rupee tokens. The richer player wins the Seal of Excellence.",

  winCondition:
    "The first player to collect 2 Seals of Excellence wins and is appointed the Maharaja's personal trader. If neither player has 2 seals, reset and play another round (the player who lost the previous round goes first).",

  scoring: [
    "Each goods token is worth its face value in rupees (visible on the back).",
    "Bonus tokens for selling 3 cards: 1–3 rupees; 4 cards: 4–6 rupees; 5+ cards: 8–10 rupees (exact value unknown until drawn).",
    "The player with the most camels at round end earns the camel token (5 rupees). Tie: neither player gets it.",
    "Tiebreaker for the Seal of Excellence: most bonus tokens; still tied: most goods tokens.",
  ],

  priorities: [
    "Sell expensive goods (diamonds, gold, silver) before your opponent — early tokens in each stack are worth more.",
    "Make large sales of 5+ cards for the highest bonus tokens.",
    "Manage your camel herd: too few camels leaves you unable to take multiple goods when you need them; too many camels risks leaving a profitable market open for your opponent.",
  ],

  rulesToObserve: [
    "Hand limit is 7 cards at the end of your turn (camels in your herd do not count).",
    "When taking cards, you take either goods or camels — never both in the same action.",
    "If you take all the camels, you must take all of them, not just some.",
    "Exchange minimum: at least 2 cards from the market for at least 2 from your hand.",
    "You cannot exchange a good you are simultaneously taking.",
    "Diamonds, gold, and silver require a minimum sale of 2 cards.",
    "You may only sell one goods type per turn.",
    "Camel cards in hand count toward the 7-card limit until placed in your herd. Remove camels from your hand at the end of your turn.",
    "Players are not required to reveal how many camels they have in their herd.",
  ],

  commonMistakes: [
    "Selling expensive goods one at a time instead of waiting for a larger sale — you miss the bonus tokens and pick up lower-value individual tokens.",
    "Hoarding too many camels and leaving valuable goods in the market for your opponent.",
    "Forgetting the 7-card hand limit — you cannot end your turn with 8+ cards.",
  ],

  glossary: {
    Market:
      "The 5 face-up cards between the players that both players can take from.",
    Herd: "A player's personal face-up stack of camel cards. Camels in the herd do not count toward the hand limit.",
    "Goods token":
      "Rupee token earned by selling goods; value is shown on the back. The highest-value tokens in each stack go first.",
    "Bonus token":
      "Extra rupee token earned for selling 3+ cards of the same type in one sale. Value is hidden until drawn.",
    "Seal of Excellence":
      "Award given to the richer player at the end of each round. First to 2 seals wins the game.",
    "Camel token":
      "Worth 5 rupees; given to the player with the most camels at round end.",
  },
};

validateGameRules(jaipur);
