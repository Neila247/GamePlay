import { useState } from "react";
import { Home } from "./components/Home.tsx";
import { RulesScreen } from "./components/RulesScreen.tsx";
import { GuidedSession } from "./components/GuidedSession.tsx";
import { dutchBlitz } from "../data/games/dutch-blitz.ts";

type Screen = "home" | "rules" | "session";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  if (screen === "session") {
    return (
      <GuidedSession
        game={dutchBlitz}
        onExit={() => setScreen("rules")}
      />
    );
  }

  if (screen === "rules") {
    return (
      <RulesScreen
        game={dutchBlitz}
        onBack={() => setScreen("home")}
        onStart={() => setScreen("session")}
      />
    );
  }

  return <Home onSelectDutchBlitz={() => setScreen("rules")} />;
}
