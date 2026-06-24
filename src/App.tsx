import { useState } from "react";
import { RulesScreen } from "./components/RulesScreen.tsx";
import { GuidedSession } from "./components/GuidedSession.tsx";
import { dutchBlitz } from "../data/games/dutch-blitz.ts";

type Screen = "rules" | "session";

export default function App() {
  const [screen, setScreen] = useState<Screen>("rules");

  if (screen === "session") {
    return (
      <GuidedSession
        game={dutchBlitz}
        onExit={() => setScreen("rules")}
      />
    );
  }

  return (
    <RulesScreen
      game={dutchBlitz}
      onStart={() => setScreen("session")}
    />
  );
}
