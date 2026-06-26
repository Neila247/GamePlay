export function TableLayout() {
  return (
    <svg
      viewBox="0 0 380 548"
      xmlns="http://www.w3.org/2000/svg"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      width="100%"
      style={{ display: "block" }}
      role="img"
      aria-label="Dutch Blitz table layout — shared centre piles and your play area"
    >
      <defs>
        <g id="tl-head" fill="var(--ink-soft)">
          <circle cx="0" cy="0" r="2.6" />
          <path d="M -3.6 6 a 3.6 3.6 0 0 1 7.2 0 Z" />
        </g>
      </defs>

      {/* SHARED CENTRE */}
      <rect x="20" y="18" width="340" height="172" rx="12" fill="var(--surface-sunk)" stroke="var(--border)" />
      <text x="34" y="40" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">SHARED — THE CENTRE</text>

      {/* Dutch Pile — red */}
      <g transform="translate(40,54)">
        <rect x="6" y="6" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="3" y="3" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="44" height="11" rx="6" fill="var(--card-red)" />
        <rect x="0" y="6" width="44" height="5" fill="var(--card-red)" />
        <text x="6" y="34" fill="var(--ink)" fontSize="16" fontWeight="700">1</text>
      </g>
      {/* Dutch Pile — blue */}
      <g transform="translate(116,54)">
        <rect x="6" y="6" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="3" y="3" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="44" height="11" rx="6" fill="var(--card-blue)" />
        <rect x="0" y="6" width="44" height="5" fill="var(--card-blue)" />
        <text x="6" y="34" fill="var(--ink)" fontSize="16" fontWeight="700">1</text>
      </g>
      {/* Dutch Pile — yellow */}
      <g transform="translate(192,54)">
        <rect x="6" y="6" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="3" y="3" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="44" height="11" rx="6" fill="var(--card-yellow)" />
        <rect x="0" y="6" width="44" height="5" fill="var(--card-yellow)" />
        <text x="6" y="34" fill="var(--ink)" fontSize="16" fontWeight="700">1</text>
      </g>
      {/* Dutch Pile — green */}
      <g transform="translate(268,54)">
        <rect x="6" y="6" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="3" y="3" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="44" height="60" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="44" height="11" rx="6" fill="var(--card-green)" />
        <rect x="0" y="6" width="44" height="5" fill="var(--card-green)" />
        <text x="6" y="34" fill="var(--ink)" fontSize="16" fontWeight="700">1</text>
      </g>

      <text x="34" y="146" fill="var(--ink-soft)" fontSize="11">Build UP 1 → 10, same colour.</text>
      <text x="34" y="162" fill="var(--ink-soft)" fontSize="11">Everyone plays onto these. Each card = 1 point.</text>
      <text x="34" y="180" fill="var(--ink)" fontSize="11" fontWeight="600">Any exposed "1" must come up here to start a pile.</text>

      {/* Arrow linking play area up to centre */}
      <path d="M 190 214 L 190 192" stroke="var(--ink-soft)" strokeWidth="1.5" fill="none" />
      <path d="M 190 190 l -4 6 l 8 0 Z" fill="var(--ink-soft)" />

      {/* YOUR PLAY AREA */}
      <rect x="20" y="216" width="340" height="316" rx="12" fill="var(--surface-sunk)" stroke="var(--border)" />
      <text x="34" y="238" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">YOUR PLAY AREA</text>

      {/* Post Piles */}
      <text x="34" y="258" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">POST PILES</text>
      {/* red 8 */}
      <g transform="translate(34,266)">
        <rect width="40" height="54" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect width="40" height="10" rx="6" fill="var(--card-red)" />
        <rect y="5" width="40" height="5" fill="var(--card-red)" />
        <text x="5" y="30" fill="var(--ink)" fontSize="14" fontWeight="700">8</text>
        <use href="#tl-head" x="31" y="45" />
      </g>
      {/* yellow 7 */}
      <g transform="translate(82,266)">
        <rect width="40" height="54" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect width="40" height="10" rx="6" fill="var(--card-yellow)" />
        <rect y="5" width="40" height="5" fill="var(--card-yellow)" />
        <text x="5" y="30" fill="var(--ink)" fontSize="14" fontWeight="700">7</text>
        <use href="#tl-head" x="31" y="45" />
      </g>
      {/* blue 6 */}
      <g transform="translate(130,266)">
        <rect width="40" height="54" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect width="40" height="10" rx="6" fill="var(--card-blue)" />
        <rect y="5" width="40" height="5" fill="var(--card-blue)" />
        <text x="5" y="30" fill="var(--ink)" fontSize="14" fontWeight="700">6</text>
        <use href="#tl-head" x="31" y="45" />
      </g>
      <text x="34" y="334" fill="var(--ink-soft)" fontSize="10.5">Build DOWN ↓, alternate boy / girl</text>

      {/* Blitz Pile (highlighted) */}
      <text x="244" y="258" fill="var(--accent)" fontSize="10" fontWeight="700" letterSpacing="0.8">BLITZ PILE</text>
      <g transform="translate(244,266)">
        <rect x="8" y="8" width="44" height="58" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="4" y="4" width="44" height="58" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="44" height="58" rx="6" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2.5" />
        <rect x="0" y="0" width="44" height="11" rx="6" fill="var(--card-green)" />
        <rect x="0" y="6" width="44" height="5" fill="var(--card-green)" />
        <text x="6" y="33" fill="var(--ink)" fontSize="15" fontWeight="700">3</text>
      </g>
      <text x="244" y="338" fill="var(--ink)" fontSize="10.5" fontWeight="600">Your key pile (10).</text>
      <text x="244" y="352" fill="var(--ink-soft)" fontSize="10.5">Empty it to win the hand!</text>

      {/* Wood Pile */}
      <text x="34" y="384" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">WOOD PILE</text>
      <g transform="translate(34,392)">
        <rect x="4" y="4" width="42" height="56" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="42" height="56" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="42" height="11" rx="6" fill="var(--card-yellow)" />
        <rect x="0" y="6" width="42" height="5" fill="var(--card-yellow)" />
        <text x="5" y="33" fill="var(--ink)" fontSize="15" fontWeight="700">4</text>
      </g>
      <text x="34" y="470" fill="var(--ink-soft)" fontSize="10.5">Turn your hand up,</text>
      <text x="34" y="484" fill="var(--ink-soft)" fontSize="10.5">three at a time. Top card plays.</text>

      {/* Hand (face down) */}
      <text x="244" y="384" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">YOUR HAND</text>
      <g transform="translate(248,392)" stroke="var(--border)">
        <rect x="0" y="0" width="42" height="56" rx="6" fill="var(--ink)" />
        <rect x="9" y="-3" width="42" height="56" rx="6" fill="var(--accent)" />
        <rect x="18" y="-6" width="42" height="56" rx="6" fill="var(--ink)" />
        <path d="M 28 8 l 22 22 M 18 18 l 22 22" stroke="var(--ink-soft)" strokeWidth="1" fill="none" opacity="0.5" />
      </g>
      <text x="244" y="470" fill="var(--ink-soft)" fontSize="10.5">Held face down.</text>
      <text x="244" y="484" fill="var(--ink-soft)" fontSize="10.5">No peeking ahead!</text>

      {/* Legend — wrapped to two lines so it never overflows the viewBox width */}
      <use href="#tl-head" x="40" y="510" />
      <text x="50" y="514" fill="var(--ink-soft)" fontSize="10">= the boy / girl figure on each card —</text>
      <text x="50" y="528" fill="var(--ink-soft)" fontSize="10">alternate these on your Post Piles.</text>
    </svg>
  );
}
