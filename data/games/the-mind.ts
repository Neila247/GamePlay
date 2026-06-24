// the-mind.ts
// Hand-authored, verified rule record for The Mind, transcribed from the official rulebook.
import type { GameRules } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const theMind: GameRules = {
  id: "the-mind",
  name: "The Mind",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 4 },
  ageRecommendation: 8,
  estimatedMinutes: 20,
  playModel: "real-time",

  components: [
    "100 number cards (numbered 1–100)",
    "12 level cards (numbered 1–12)",
    "5 life cards",
    "3 throwing star cards",
  ],

  objective:
    "Work together as a team to play all your cards onto a single shared stack in ascending order — without communicating, discussing, or signalling card values in any way. Survive all levels without losing your last life.",

  setup: [
    {
      id: "lives-and-stars",
      instruction: "Place the starting lives and throwing stars face up on the table where everyone can see them. Set the extras aside at the edge — they may be earned back as rewards.",
      detail:
        "2 players: 2 lives, 1 throwing star, levels 1–12. 3 players: 3 lives, 1 throwing star, levels 1–10. 4 players: 4 lives, 1 throwing star, levels 1–8.",
    },
    {
      id: "level-stack",
      instruction: "Stack the level cards in ascending order with level 1 on top. Place unused levels back in the box. This stack sits openly on the table.",
    },
    {
      id: "deal",
      instruction: "Shuffle all 100 number cards. Deal each player one card face down (for level 1). Players hold their cards so no one else can see them. Place the remaining number cards face down at the edge of the table.",
    },
    {
      id: "concentrate",
      instruction: "To start each level, every player who is ready places one hand palm down on the table. Once all hands are down, everyone lifts them together and play begins.",
      detail: "This collective concentration ritual is important — it synchronises the team. Players may call 'stop' at any time during a level to re-do the concentration ritual before continuing.",
    },
  ],

  playLoop: {
    summary:
      "There are no turns. All players hold their cards and play them one at a time onto the shared central stack in ascending order, using only their sense of timing — no talking, no signals, no hints.",
    steps: [
      {
        id: "play-lowest",
        instruction:
          "Whoever believes they currently hold the lowest unplayed card places it face up on the central stack. Each player must always play their lowest card first — you cannot skip ahead to a higher card.",
        detail:
          "If you hold multiple cards, play them from lowest to highest. You may play two cards back-to-back if they are consecutive (e.g. 36 then 37), but each is placed down one at a time.",
      },
      {
        id: "wrong-order",
        instruction:
          "If a card is played out of order (i.e. another player holds a lower card), any player who has a lower card immediately calls 'stop'. The team loses one life.",
        detail:
          "Remove one life card from the table. Then all players set aside any cards in their hand that are lower than the card just played — those cards are out of the level. The team refocuses concentration and continues the current level (it does not restart).",
      },
      {
        id: "throwing-star",
        instruction:
          "At any point during a level, any player may raise their hand to suggest playing a throwing star. If all players agree, each player discards their single lowest card face up to one side. One throwing star is removed from the table. The team then refocuses and continues.",
        detail:
          "A throwing star is a safety valve — use it when you suspect a collision is imminent. All players must agree; a single disagreement means the star is not used.",
      },
      {
        id: "level-complete",
        instruction:
          "When all cards have been correctly played onto the stack in ascending order, the level is complete. Remove the top level card from the stack and place it in the box.",
      },
      {
        id: "next-level",
        instruction:
          "Shuffle all 100 number cards again and deal each player one more card than last level (level number = cards per player). Collect any earned rewards shown on the completed level card (a life or a throwing star), then do the concentration ritual and begin the next level.",
        detail:
          "Rewards are shown in the bottom-right corner of each level card and are earned after completing levels 2, 3, 5, 6, 8, and 9. Maximum at any time: 5 lives and 3 throwing stars.",
      },
    ],
  },

  priorities: [
    "Never disclose your card values — no talking, no gestures, no hints of any kind.",
    "Always play your lowest card first; you cannot hold back a low card to play a high one.",
    "When in doubt, wait — hesitation signals to teammates that you may have a low card.",
    "Use a throwing star proactively when the group feels uncertain, not after a mistake.",
    "The concentration ritual at the start of each level is essential — do not skip it.",
  ],

  winCondition:
    "The team wins by successfully completing all levels in the stack. The team loses if they run out of lives.",

  rulesToObserve: [
    "Absolutely no sharing of card values, no counting out loud, and no secret signals of any kind.",
    "Cards are always placed on the stack one at a time.",
    "Each player must play their lowest held card before any higher card.",
    "When a mistake is called, all cards lower than the last card played are set aside — they do not count against the team and the level continues, not restarts.",
    "A throwing star requires unanimous agreement from all players before it is used.",
  ],

  commonMistakes: [
    "Talking or hinting about card values — the no-communication rule is absolute.",
    "Restarting a level after a mistake — the level always continues from where it stopped.",
    "Playing a higher card before your lowest — you must always lead with your minimum.",
    "Skipping the concentration ritual — it is a core mechanic, not optional flavour.",
  ],

  glossary: {
    Life: "A team resource; lose one whenever a card is played out of order. Lose the last life and the game ends.",
    "Throwing star": "A team resource spent to let every player discard their lowest card simultaneously, avoiding a likely mistake.",
    Level: "A round of play. The level number equals the number of cards each player is dealt. Complete all levels to win.",
    "Blind mode": "A bonus challenge after winning all levels: cards are played face down and the stack is checked only at the end of each level.",
  },
};

validateGameRules(theMind);
