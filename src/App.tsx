import { useState } from "react";
import { Home } from "./components/Home.tsx";
import { RulesScreen } from "./components/RulesScreen.tsx";
import { GuidedSession } from "./components/GuidedSession.tsx";
import { dutchBlitz } from "../data/games/dutch-blitz.ts";
import { cabo } from "../data/games/cabo.ts";
import { fungiMorels } from "../data/games/fungi-morels.ts";
import { highSociety } from "../data/games/high-society.ts";
import { jaipur } from "../data/games/jaipur.ts";
import { kites } from "../data/games/kites.ts";
import { kluster } from "../data/games/kluster.ts";
import { landVsSea } from "../data/games/land-vs-sea.ts";
import { monopolyDeal } from "../data/games/monopoly-deal.ts";
import { paris } from "../data/games/paris.ts";
import { skull } from "../data/games/skull.ts";
import { sushiGo } from "../data/games/sushi-go.ts";
import { theMind } from "../data/games/the-mind.ts";
import { unoFlip } from "../data/games/uno-flip.ts";
import type { GameRules } from "../data/games/dutch-blitz.ts";

const GAME_REGISTRY: Record<string, GameRules> = {
  "dutch-blitz": dutchBlitz,
  cabo,
  "fungi-morels": fungiMorels,
  "high-society": highSociety,
  jaipur,
  kites,
  kluster,
  "land-vs-sea": landVsSea,
  "monopoly-deal": monopolyDeal,
  paris,
  skull,
  "sushi-go": sushiGo,
  "the-mind": theMind,
  "uno-flip": unoFlip,
};

type Screen = "home" | "rules" | "session";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedGame, setSelectedGame] = useState<GameRules>(dutchBlitz);

  function handleSelectGame(id: string) {
    const game = GAME_REGISTRY[id];
    if (!game) return;
    setSelectedGame(game);
    setScreen("rules");
  }

  if (screen === "session") {
    return (
      <GuidedSession
        game={selectedGame}
        onExit={() => setScreen("rules")}
      />
    );
  }

  if (screen === "rules") {
    return (
      <RulesScreen
        game={selectedGame}
        onBack={() => setScreen("home")}
        onStart={() => setScreen("session")}
      />
    );
  }

  return <Home onSelectGame={handleSelectGame} />;
}
