import caboCover from "../assets/covers/cabo.jpg";
import dutchBlitzCover from "../assets/covers/dutch-blitz.jpg";
import fungiMorelsCover from "../assets/covers/fungi-morels.jpg";
import highSocietyCover from "../assets/covers/high-society.png";
import jaipurCover from "../assets/covers/jaipur.jpg";
import kitesCover from "../assets/covers/kites.png";
import klusterCover from "../assets/covers/kluster.jpg";
import landVsSeaCover from "../assets/covers/land-vs-sea.png";
import monopolyDealCover from "../assets/covers/monopoly-deal.jpg";
import parisCover from "../assets/covers/paris.jpg";
import skullCover from "../assets/covers/skull.jpg";
import sushiGoCover from "../assets/covers/sushi-go.jpg";
import theMindCover from "../assets/covers/the-mind.png";
import unoFlipCover from "../assets/covers/uno-flip.jpg";

type Props = { onSelectGame: (id: string) => void };

type GameEntry = {
  id: string;
  name: string;
  cover: string;
  active: boolean;
};

const GAMES: GameEntry[] = [
  { id: "land-vs-sea",   name: "Land vs Sea",                  cover: landVsSeaCover,    active: true },
  { id: "paris",         name: "Paris: La Cité de la Lumière", cover: parisCover,        active: true },
  { id: "kites",         name: "Kites",                        cover: kitesCover,        active: true },
  { id: "jaipur",        name: "Jaipur",                       cover: jaipurCover,       active: true },
  { id: "fungi-morels",  name: "Fungi",                        cover: fungiMorelsCover,  active: true },
  { id: "high-society",  name: "High Society",                 cover: highSocietyCover,  active: true },
  { id: "kluster",       name: "Kluster",                      cover: klusterCover,      active: true },
  { id: "skull",         name: "Skull",                        cover: skullCover,        active: true },
  { id: "sushi-go",      name: "Sushi Go!",                    cover: sushiGoCover,      active: true },
  { id: "dutch-blitz",   name: "Dutch Blitz",                  cover: dutchBlitzCover,   active: true },
  { id: "uno-flip",      name: "UNO Flip!",                    cover: unoFlipCover,      active: true },
  { id: "the-mind",      name: "The Mind",                     cover: theMindCover,      active: true },
  { id: "monopoly-deal", name: "Monopoly Deal",                cover: monopolyDealCover, active: true },
  { id: "cabo",          name: "CABO",                         cover: caboCover,         active: true },
];

export function Home({ onSelectGame }: Props) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="px-4 pt-8 pb-4">
        <h1 className="font-display text-xl font-bold text-ink">Your games</h1>
        <p className="text-sm text-ink-soft mt-2">Learn the game you already own.</p>
      </header>

      <div className="px-4 pb-6 flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-surface border border-border rounded-card px-4 py-3">
          <SearchGlyph />
          <span className="text-sm text-ink-soft">Search by name</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-surface border border-border rounded-card px-4 text-sm text-ink"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <CameraGlyph /> Scan
        </button>
      </div>

      <main className="px-4 pb-12">
        <div className="grid grid-cols-2 gap-4 items-start">
          {GAMES.map((game) =>
            game.active ? (
              <button
                key={game.id}
                onClick={() => onSelectGame(game.id)}
                className="text-left w-full"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <GameTile game={game} />
              </button>
            ) : (
              <div key={game.id} className="opacity-60 select-none">
                <GameTile game={game} />
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

function GameTile({ game }: { game: GameEntry }) {
  return (
    <div>
      <div className="rounded-card overflow-hidden bg-surface-sunk shadow-1">
        <img
          src={game.cover}
          alt={game.name}
          className="w-full h-auto block"
        />
      </div>
      <p className="text-sm font-medium text-ink mt-2 leading-snug">
        {game.name}
      </p>
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CameraGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
