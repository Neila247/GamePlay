// fungi-morels.ts
// Hand-authored, verified rule record for Fungi, transcribed from the official Pegasus Spiele rulebook (©2014).
// Published as "Fungi" (Pegasus Spiele) and "Morels" (Two Lanterns Games) — same game, different editions.
import type { GameRules, TurnPhase } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const fungiMorels: GameRules = {
  id: "fungi-morels",
  name: "Fungi",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 2 },
  ageRecommendation: 10,
  estimatedMinutes: 40,
  playModel: "turn-based",

  components: [
    "86 Forest cards: Honey fungus (×10), Tree Ear (×8), Lawyer's Wig (×6), Shiitake (×5), Hen of the Woods (×5), Birch bolete (×4), Porcini (×4), Chanterelle (×4), Morels (×3), Fly agaric (×5), Butter (×3), Cidre (×5), Pan (×13), Basket (×5), Moon (×8)",
    "8 Night cards (one for each mushroom type except Morels and Fly agaric)",
    "18 Sticks (currency for reaching deeper into the Forest)",
    "1 Pair of Shoes card (marks the immediate Forest area)",
    "6 Overview cards",
  ],

  objective:
    "Forage and cook mushrooms to earn the most Flavor points. Collect sets of identical mushrooms from the shared Forest row, cook them in your pan, and enhance dishes with Butter and Cidre. The player with the most Flavor points when the Forest runs out wins.",

  piles: [
    {
      name: "Forest",
      count: "8 cards in a row",
      location: "between both players",
      purpose:
        "The shared row of available cards. The 2 cards nearest you (in front of the Shoes) are free to take. Cards deeper in the row cost 1–6 Sticks each to reach. One card moves to the Decay pile at the end of every turn, so the Forest slowly advances toward you.",
    },
    {
      name: "Decay Pile",
      count: "up to 4 cards",
      location: "beside the Forest, nearest to your feet",
      purpose:
        "Cards that have drifted past the Shoes accumulate here — still accessible by taking the whole pile (Action B), but only until a 5th card would arrive, at which point all 4 are discarded. Acts as a last-chance salvage area.",
    },
    {
      name: "Draw Pile",
      count: "remaining Forest cards",
      location: "one end of the table",
      purpose:
        "Replenishes the Forest after each turn. When exhausted, the game ends as soon as the last Forest card is taken.",
    },
    {
      name: "Night Cards",
      count: "8 cards",
      location: "separate face-down pile beside the draw pile",
      purpose:
        "Obtained by taking a Moon card from the Forest. Each Night card represents 2 mushrooms of one type but counts as only 1 card against your hand limit. Used in cooking and selling like regular mushroom cards.",
    },
  ],

  setup: [
    {
      id: "set-aside-pans",
      instruction: "Remove 2 Pan cards from the Forest deck and set them aside.",
    },
    {
      id: "shuffle-forest",
      instruction: "Shuffle the remaining Forest cards and place them as a face-down draw pile on one side of the table.",
    },
    {
      id: "reveal-forest",
      instruction:
        "Reveal 8 cards from the draw pile and lay them in a line between the two players — this is the Forest. Place the Pair of Shoes card horizontally in front of the 2 cards nearest to you to mark the immediate area.",
      detail:
        "Leave a small space next to those 2 cards for the Decay pile.",
    },
    {
      id: "shuffle-night",
      instruction: "Shuffle the 8 Night cards and place them face-down beside the draw pile.",
    },
    {
      id: "sticks",
      instruction: "Place the pile of 18 Sticks beside the card piles.",
    },
    {
      id: "player-items",
      instruction:
        "Each player takes 1 Overview card, 1 of the 2 reserved Pans (place it face-up in your display), and draws 3 Forest cards as their starting hand.",
      detail:
        "If you draw a Basket: place it in your display immediately (do not draw a replacement). If you draw a Moon: put it on the discard pile and draw a Night card instead. If you draw a Fly agaric: put it on the discard pile, do not draw a replacement; whoever last had mushrooms for dinner goes first.",
    },
  ],

  turnStructure: {
    summary:
      "On your turn, choose exactly 1 of 5 Actions. You cannot pass. After your action, perform the mandatory end-of-turn steps: move 1 Forest card to the Decay pile, slide the Forest toward you, then refill the Forest to 8 cards.",
    phases: [
      {
        id: "choose-action",
        instruction: "Choose exactly 1 of the following 5 actions:",
        options: [
          "A) Take 1 card from the Forest (free if in front of Shoes; costs 1–6 Sticks if deeper in the Forest)",
          "B) Take all cards from the Decay pile (add them to your hand; resolve Moon/Basket/Fly agaric as normal)",
          "C) Cook 3 or more identical mushrooms (place them on a Pan in your display; add Butter for 4+, Cidre for 5+; each Butter = +3 Flavor pts, each Cidre = +5 Flavor pts)",
          "D) Sell 2 or more identical mushrooms (discard them to gain Sticks per card, as shown on the card)",
          "E) Put down 1 Pan (place a Pan from your hand into your display for later cooking)",
        ],
        detail:
          "Hand limit starts at 8 cards. Each Basket in your display raises it by 2. If you cannot legally perform any action, your opponent takes actions one at a time until you can act again. Night cards count as 2 mushrooms for cooking/selling but as 1 card against your hand limit.",
      } as TurnPhase,
      {
        id: "end-of-turn",
        instruction:
          "After your action, perform these 3 steps in order: (1) Move the Forest card closest to the Decay pile onto the Decay pile. If a 5th card would enter the pile, discard all 4 existing cards first and start a new pile with the 5th. (2) Slide the remaining Forest cards toward the Decay pile so 2 cards are again in front of the Shoes. (3) Draw 1 or 2 cards from the draw pile and add them to the far end (Deep Forest) to restore the Forest to 8 cards.",
      } as TurnPhase,
    ],
  },

  endOfRound:
    "There are no separate rounds. The game ends immediately when the last card from the Forest is taken.",

  winCondition:
    "The player with the most Flavor points at game end wins. Tiebreaker: whoever cooked the most mushrooms wins (Night cards count as 2; Butter and Cidre do not count).",

  scoring: [
    "Each cooked mushroom scores Flavor points as shown on the card (see the pan-symbol boxes on upper left/right of each Forest card).",
    "Night cards (moonlit mushrooms) yield double Flavor points when cooked.",
    "Butter adds 3 Flavor points to the Pan it is cooked in.",
    "Cidre adds 5 Flavor points to the Pan it is cooked in.",
    "Butter/Cidre bonuses: cook 4+ identical mushrooms to add 1 Butter; 5+ to add 1 Cidre instead; 8+ for 2 Butter; 9+ for 1 Butter + 1 Cidre; 10+ for 2 Cidre.",
    "Uncooked mushrooms in your hand score nothing.",
  ],

  rulesToObserve: [
    "You must perform exactly 1 action per turn — you cannot pass.",
    "You can only cook or sell 1 type of mushroom per turn.",
    "Butter and Cidre must be added at the time of cooking; they cannot be added to a finished Pan.",
    "A Pan is used once; once mushrooms are cooked into it, it cannot be reused or accept more mushrooms.",
    "You start the game with 1 Pan in your display; more can be obtained via Actions C and E.",
    "Hand limit starts at 8. Each Basket in your display adds 2. You may never hold more cards than your limit.",
    "Fly agaric: placed immediately in your display, never in hand. Immediately reduces your effective hand limit to 4 (plus 2 per Basket) until the end of your next turn, then goes to the discard pile.",
    "Moon cards go to the discard pile; draw a Night card instead.",
    "Sticks are not hand cards and do not count toward your limit.",
  ],

  commonMistakes: [
    "Forgetting to perform all 3 end-of-turn steps (decay, slide, refill) after every action.",
    "Trying to add Butter or Cidre to a Pan after mushrooms have already been cooked into it.",
    "Counting Night cards as 1 mushroom rather than 2 when cooking or selling.",
    "Attempting to take a Deep Forest card without paying the required Sticks.",
    "Letting the Decay pile grow beyond 4 cards instead of discarding the overflow.",
  ],

  glossary: {
    Forest:
      "The shared row of 8 face-up cards from which both players forage. Shifts toward you each turn.",
    "Decay Pile":
      "Cards that have drifted out of the main Forest. Accessible via Action B; discarded when a 5th card would join.",
    "Deep Forest":
      "The 6 Forest cards not immediately in front of your shoes. Costs 1–6 Sticks to reach.",
    Sticks:
      "Currency earned by selling mushrooms (Action D); spent to reach cards deeper in the Forest (Action A2).",
    "Night card":
      "A more powerful version of a mushroom card obtained via the Moon. Counts as 2 mushrooms but 1 card against your hand limit.",
    Pan: "Required for cooking (Action C). You start with 1; more can be added via Actions C and E. Each Pan is used once.",
    Butter:
      "Cooked alongside 4+ identical mushrooms to add 3 Flavor points to the Pan.",
    Cidre:
      "Cooked alongside 5+ identical mushrooms to add 5 Flavor points to the Pan.",
    "Fly agaric":
      "Goes to your display immediately; temporarily halves your effective hand limit to 4 (plus Baskets) until end of your next turn.",
    Basket: "Goes to your display immediately; permanently raises your hand limit by 2.",
  },
};

validateGameRules(fungiMorels);
