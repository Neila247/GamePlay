// Per-game teaching diagrams. `overview` is the single one-glance diagram shown
// at the top of a game's guided session: on the first pile slide for games with
// piles (Dutch Blitz), otherwise on the practice-intro slide. Anything without a
// registered diagram falls back to the editorial FigurePlate.
//
// Only Dutch Blitz has hand-drawn per-zone diagrams (TableLayout + CardSequence);
// those stay wired directly in GuidedSession. Every other game gets one overview.

import type { ComponentType } from "react";
import { TableLayout } from "./TableLayout.tsx";
import { KitesTimers } from "./KitesTimers.tsx";
import { TheMindStack } from "./TheMindStack.tsx";
import { JaipurMarket } from "./JaipurMarket.tsx";
import { SkullMat } from "./SkullMat.tsx";
import { CaboLayout } from "./CaboLayout.tsx";
import { KlusterCord } from "./KlusterCord.tsx";
import { HighSocietyAuction } from "./HighSocietyAuction.tsx";
import { MonopolyDealLayout } from "./MonopolyDealLayout.tsx";
import { SushiGoDraft } from "./SushiGoDraft.tsx";
import { ParisGrid } from "./ParisGrid.tsx";
import { LandVsSeaMap } from "./LandVsSeaMap.tsx";
import { FungiForest } from "./FungiForest.tsx";
import { UnoFlipSides } from "./UnoFlipSides.tsx";

const OVERVIEWS: Record<string, ComponentType> = {
  "dutch-blitz": TableLayout,
  kites: KitesTimers,
  "the-mind": TheMindStack,
  jaipur: JaipurMarket,
  skull: SkullMat,
  cabo: CaboLayout,
  kluster: KlusterCord,
  "high-society": HighSocietyAuction,
  "monopoly-deal": MonopolyDealLayout,
  "sushi-go": SushiGoDraft,
  paris: ParisGrid,
  "land-vs-sea": LandVsSeaMap,
  "fungi-morels": FungiForest,
  "uno-flip": UnoFlipSides,
};

export function overviewFor(id: string): ComponentType | null {
  return OVERVIEWS[id] ?? null;
}
