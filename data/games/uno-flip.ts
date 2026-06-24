// uno-flip.ts
// Hand-authored, verified rule record for UNO Flip!, transcribed from the official Mattel rulebook (©2018).
import type { GameRules, TurnPhase } from "./dutch-blitz.ts";
import { validateGameRules } from "../validate.ts";

export const unoFlip: GameRules = {
  id: "uno-flip",
  name: "UNO Flip!",
  source: "hand-authored",
  verified: true,
  players: { min: 2, max: 10 },
  estimatedMinutes: 30,
  playModel: "turn-based",

  components: [
    "112 double-sided cards",
    "LIGHT SIDE (white border): 18 Blue, 18 Green, 18 Red, 18 Yellow (each numbered 1–9); 8 Draw One cards (2 per colour); 8 Reverse cards (2 per colour); 8 Skip cards (2 per colour); 8 Flip cards (2 per colour); 4 Wild cards; 4 Wild Draw Two cards",
    "DARK SIDE (black border): 18 Pink, 18 Teal, 18 Orange, 18 Purple (each numbered 1–9); 8 Draw Five cards (2 per colour); 8 Reverse cards (2 per colour); 8 Skip Everyone cards (2 per colour); 8 Flip cards (2 per colour); 4 Wild cards; 4 Wild Draw Color cards",
  ],

  objective:
    "Be the first player to empty your hand and score points from your opponents' remaining cards. Play proceeds on the Light Side until a Flip card is played, at which point the game switches to the harsher Dark Side — and back again on the next Flip.",

  setup: [
    {
      id: "orient-deck",
      instruction:
        "Make sure all cards face the same way: Light Side cards facing one direction, Dark Side cards facing the other.",
    },
    {
      id: "determine-dealer",
      instruction:
        "Each player draws 1 card and reveals the Light Side. The player with the highest number becomes the dealer (cards with symbols count as zero).",
    },
    {
      id: "deal",
      instruction: "The dealer shuffles and deals each player 7 cards. Hold them so the Light Side faces you and the Dark Side faces your opponents.",
    },
    {
      id: "draw-pile",
      instruction:
        "Place the remaining deck with the Light Side face-down to form the Draw pile (so the Dark Side faces up).",
    },
    {
      id: "discard-pile",
      instruction:
        "Turn the top card of the Draw pile face-up to start the Discard pile. If an Action card is turned up, apply its effect before play begins (except Wild Draw Two — return it to the deck and draw another card instead).",
    },
  ],

  turnStructure: {
    summary:
      "Play starts with the person to the left of the dealer and continues clockwise (unless a Reverse card changes direction). On your turn, play a matching card or draw from the pile. The active side (Light or Dark) determines which rules and penalties apply.",
    phases: [
      {
        id: "play-or-draw",
        instruction:
          "Play 1 card from your hand onto the Discard pile. A card matches if it shares the colour, number, or symbol of the top Discard card. Wild cards can always be played.",
        options: [
          "Match by colour",
          "Match by number",
          "Match by symbol (Action card type)",
          "Play a Wild card (choose any colour)",
        ],
        detail:
          "If you have no matching card, draw 1 card from the Draw pile. If that drawn card can be played, you may play it immediately; otherwise your turn ends. You may also choose NOT to play a card you could legally play, but then you must draw 1 from the Draw pile. If the Draw pile runs out, reshuffle the Discard pile (leaving the top card) to form a new Draw pile.",
      } as TurnPhase,
      {
        id: "say-uno",
        instruction:
          "When you are about to play your second-to-last card, leaving only 1 card in hand, you must shout \"UNO!\" before the next player begins their turn.",
        detail:
          "If you are caught not saying \"UNO!\" before the next player's turn begins, you must draw 2 cards as a penalty.",
      } as TurnPhase,
    ],
  },

  specialCalls: [
    {
      name: "Flip!",
      when: "A Flip card is played.",
      effect:
        "All play switches from the current side to the other side. Flip over the Discard pile (played card now on bottom), then the Draw pile, then everyone flips their hand cards. The new side stays active until another Flip card is played.",
    },
    {
      name: "UNO!",
      when: "You play your second-to-last card, leaving 1 card in hand.",
      effect: "Declares you have one card left. Failure to call it before the next player's turn results in drawing 2 cards.",
    },
  ],

  endOfRound:
    "A round ends when one player plays their last card (goes out). If the last card is a Draw One, Draw Five, Wild Draw Two, or Wild Draw Color, the affected player(s) must draw the required cards before the round ends — those cards count toward the loser's point total.",

  winCondition:
    "The first player to reach 500 points wins. Points are scored by the player who went out, based on cards remaining in opponents' hands.",

  scoring: [
    "The player who goes out scores points for all cards left in opponents' hands:",
    "Number cards (1–9): face value",
    "Draw One: 10 points",
    "Draw Five: 20 points",
    "Reverse (Light or Dark): 20 points",
    "Skip: 20 points",
    "Skip Everyone: 30 points",
    "Flip: 20 points",
    "Wild: 40 points",
    "Wild Draw Two: 50 points",
    "Wild Draw Color: 60 points",
    "IMPORTANT: Score cards based on which side (Light or Dark) the game ended on.",
    "Alternative scoring: keep a running tally of points each player accumulates over rounds. When someone reaches 500, the player with the LOWEST total wins.",
  ],

  rulesToObserve: [
    "Always keep cards oriented with your active side facing you and the other side facing opponents.",
    "When adding cards to your hand, ensure they face the correct direction for the current active side.",
    "Wild Draw Two (Light) may only be played if you have no card in hand matching the colour on top of the Discard pile — number or symbol matches do not justify blocking it. Challengeable.",
    "Wild Draw Color (Dark) may only be played if you have no card matching the colour on top of the Discard pile. Challengeable.",
    "If you challenge a Wild Draw Two or Wild Draw Color and the challenged player is guilty, they draw the penalty instead of you. If innocent, you draw the penalty PLUS 2 extra cards.",
    "You may choose NOT to play a card on your turn, but you must then draw 1 card from the Draw pile.",
  ],

  commonMistakes: [
    "Forgetting to flip hand cards (along with the piles) when a Flip card is played.",
    "Playing a Wild Draw Two or Wild Draw Color when you have a colour match — this is illegal and challengeable.",
    "Scoring based on the wrong side after the game ends.",
    "Forgetting that the last player affected by a Draw card must draw those cards before the round is scored.",
  ],

  glossary: {
    "Light Side":
      "The default side (white-bordered cards) with milder action cards: Draw One, Skip, Reverse, Wild Draw Two.",
    "Dark Side":
      "The harsh side (black-bordered cards) activated by a Flip card: Draw Five, Skip Everyone, Wild Draw Color.",
    "Flip card":
      "Action card that switches all play from one side to the other. Affects the Discard pile, Draw pile, and every player's hand.",
    "Skip Everyone":
      "Dark Side action: all other players skip their turn; the player who laid it goes again.",
    "Wild Draw Color":
      "Dark Side Wild: the next player draws cards until they get a card of the chosen colour, then skips their turn. Challengeable if the player had a colour match.",
    "Wild Draw Two":
      "Light Side Wild: next player draws 2 and skips their turn. Challengeable if the player had a colour match.",
  },
};

validateGameRules(unoFlip);
