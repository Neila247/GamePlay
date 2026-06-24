type Props = { onSelectDutchBlitz: () => void };

type GameEntry = {
  id: string;
  name: string;
  tileBg: string;
  active: boolean;
};

const GAMES: GameEntry[] = [
  { id: "land-vs-sea",  name: "Land vs Sea",                  tileBg: "bg-surface-sunk", active: false },
  { id: "paris",        name: "Paris: Die Stadt der Lichter", tileBg: "bg-surface-sunk", active: false },
  { id: "kites",        name: "Kites",                        tileBg: "bg-surface-sunk", active: false },
  { id: "jaipur",       name: "Jaipur",                       tileBg: "bg-surface-sunk", active: false },
  { id: "fungi",        name: "Fungi",                        tileBg: "bg-surface-sunk", active: false },
  { id: "high-society", name: "High Society",                 tileBg: "bg-surface-sunk", active: false },
  { id: "kluster",      name: "Kluster",                      tileBg: "bg-surface-sunk", active: false },
  { id: "skull",        name: "Skull",                        tileBg: "bg-surface-sunk", active: false },
  { id: "sushi-go",     name: "Sushi Go!",                    tileBg: "bg-surface-sunk", active: false },
  { id: "dutch-blitz",  name: "Dutch Blitz",                  tileBg: "bg-card-green",   active: true  },
  { id: "uno-flip",     name: "UNO Flip!",                    tileBg: "bg-surface-sunk", active: false },
  { id: "the-mind",     name: "The Mind",                     tileBg: "bg-surface-sunk", active: false },
  { id: "monopoly-deal",name: "Monopoly Deal",                tileBg: "bg-surface-sunk", active: false },
  { id: "cabo",         name: "CABO",                         tileBg: "bg-surface-sunk", active: false },
];

export function Home({ onSelectDutchBlitz }: Props) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="px-4 pt-8 pb-6">
        <h1 className="text-xl font-bold text-ink">Your games</h1>
      </header>

      <main className="px-4 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {GAMES.map((game) =>
            game.active ? (
              <button
                key={game.id}
                onClick={onSelectDutchBlitz}
                className="text-left w-full group"
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
      {/*
        Image slot — swappable: replace the background with
        <img src="..." className="w-full h-full object-cover" />
        without touching the layout wrapper below.
      */}
      <div
        className={`aspect-box w-full rounded-card overflow-hidden ${game.tileBg}`}
      />
      <p className="text-sm font-medium text-ink mt-2 leading-snug">
        {game.name}
      </p>
    </div>
  );
}
