// kites.ts
// Hand-authored, verified rule record for Kites, transcribed from the official rulebook.
import type { GameRules, PlayStep } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const kites: GameRules = {
  id: "kites",
  name: "Kites",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 5 },
  estimatedMinutes: 15,
  playModel: "real-time",

  components: [
    "6 sand timers: Red (30 sec), Orange (45 sec), Yellow (60 sec), Blue (75 sec), White (60 sec — the shared 'wildcard' timer), Purple (90 sec)",
    "53 Kite Cards (single-color/symbol and double-color/symbol cards matching the 5 colored timers)",
    "12 Challenge Cards: 4 Storm, 4 Crossed Lines, 4 Airplane (set aside for base game; add for harder play)",
  ],

  objective:
    "Work together as a team to play every card before any sand timer runs out. Everyone wins or loses together.",

  setup: [
    {
      id: "timers",
      instruction:
        "Make sure all the sand is on one side of each timer. Lay all 6 timers flat on their sides in the middle of the table.",
    },
    {
      id: "challenge-cards",
      instruction:
        "Set aside all 12 Challenge Cards (Storm, Crossed Lines, and Airplane). Do not shuffle them into the deck for the base game.",
      detail:
        "For a harder game, Challenge Cards can be added back in after players have dealt hands from the deck — see Challenge Mode.",
    },
    {
      id: "deal",
      instruction:
        "Shuffle all Kite Cards together. Deal cards face-down to each player based on player count: 2–3 players get 5 cards each; 4 players get 4 cards each; 5 players get 3 cards each. Players should not look at their cards yet.",
      detail:
        "With 2 players there is an alternate variant: deal 5 cards each using only 4 of the 6 timers — see Warm-up Mode for the simpler 4-timer setup.",
    },
    {
      id: "draw-piles",
      instruction:
        "Place the remaining Kite Cards in one or more face-down piles within reach of all players.",
    },
    {
      id: "starting-player",
      instruction:
        "The player who has most recently flown a kite is the Start Player (or choose randomly).",
    },
  ],

  playLoop: {
    summary:
      "There are no traditional turns — play moves clockwise but the real-time pressure comes from sand timers counting down. Players take turns in order, but any timer can run out at any moment. Once you start, you cannot pause.",
    steps: [
      {
        id: "start-white-timer",
        instruction:
          "To begin, stand up the white timer with sand on top. All players may now look at their hand of cards.",
      },
      {
        id: "play-card",
        instruction:
          "On your turn, play 1 card face-up in a pile in front of you. The color(s) and symbol(s) on the card determine which timer(s) you must flip.",
        detail:
          "You are free to delay playing your card — this is risky but can occasionally be beneficial. You must play exactly 1 card per turn.",
      },
      {
        id: "flip-timers",
        instruction:
          "Immediately flip the sand timer(s) matching the icons on the card you played. If the timer is on its side, stand it upright with the sand on top.",
        detail:
          "Single-color/symbol card: flip that color's timer OR the white timer. Double-color/symbol card: flip both matching colored timers (cannot flip the white timer). You must flip the timers yourself.",
      },
      {
        id: "draw",
        instruction:
          "After flipping all matching timers, draw 1 new card from any draw pile to refill your hand.",
        detail:
          "The next player may begin their turn as soon as you have finished flipping (even before you draw your new card).",
      },
      {
        id: "grand-finale",
        instruction:
          "Once all draw piles are empty, the Grand Finale begins. Players continue playing cards from their hands, but the white timer may no longer be flipped for the rest of the game.",
      },
    ] satisfies PlayStep[],
  },

  priorities: [
    "Watch the red timer (30 sec) most closely — it runs out fastest.",
    "Communicate: tell teammates which timers are close to running out and which cards you plan to play.",
    "Any single-color card can flip the white timer — use this flexibility to buy time when a critical colored timer is nearly empty.",
    "During the Grand Finale, you lose the white timer as a safety net — coordinate quickly to cover the remaining timers.",
  ],

  winCondition:
    "All players win together if every card (including all cards in players' hands) is played before any sand timer runs out. If any timer runs out, the game ends and players score based on how many cards remain.",

  scoring: [
    "0 cards remaining: You've blown everyone away — well done! (Perfect score)",
    "1–6 cards remaining: Flying high… can you fly even higher?",
    "7–15 cards remaining: You're lifting people's spirits! Keep trying.",
    "16–20 cards remaining: Your lofty plans are starting to play out — keep at it.",
    "21–39 cards remaining: A slight breeze… warming up!",
    "40–60 cards remaining: No wind in sight.",
  ],

  rulesToObserve: [
    "Once you begin the game, there is no way to pause.",
    "You must play exactly 1 card on your turn — you cannot skip.",
    "You must flip the matching timer(s) yourself; if physically unable, designate another player before the game starts.",
    "Double-color/symbol Kite Cards cannot be used to flip the white timer.",
    "You may only draw a new card after you have finished flipping all matching timers.",
    "If you knock over a timer, stand it back up as it was. If unsure which way, put the side with less sand on top.",
    "During the Grand Finale (all draw piles empty), the white timer may not be flipped under any circumstances — except by a Storm Challenge Card.",
  ],

  commonMistakes: [
    "Forgetting that the white timer can only be flipped by single-color/symbol cards, not double ones.",
    "Not communicating about which timers are nearly empty — teammates can't help if they don't know.",
    "Panicking in the Grand Finale and forgetting you can no longer flip the white timer.",
  ],

  glossary: {
    "White timer":
      "The shared 60-second wildcard timer; any single-color/symbol card can flip it. Cannot be flipped during the Grand Finale (except by a Storm card).",
    "Grand Finale":
      "The final phase of the game once all draw piles are empty. Players must play remaining hand cards, but the white timer can no longer be flipped.",
    "Challenge Cards":
      "Optional cards (Storm, Crossed Lines, Airplane) shuffled into the draw pile after dealing to increase difficulty.",
    "Storm Card":
      "Challenge card: announce 'A storm is coming!', then on your next turn play it and flip every sand timer (including white).",
    "Crossed-Lines Card":
      "Challenge card: keep it secret, then on your next turn announce 'Crossed lines' and each player swaps one card left and one card right.",
    "Airplane Card":
      "Challenge card: keep it secret, then on your next turn announce 'Airplane!' — no one may speak until the Airplane Card is covered by another card.",
    "Warm-up Mode":
      "Easier variant: remove the orange and purple timers and all Kite Cards bearing those colors (roughly half the deck).",
  },
};

validateGameRules(kites);
